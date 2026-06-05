import { NextResponse } from "next/server";

/* ─── /api/subscribe ──────────────────────────────────────────────────
   Server-side proxy to Kit's v4 Forms API · the supported, modern
   integration path. Dr. Gissele's V4 personal-use API key authorizes
   the subscribe call.

   Endpoint:
     POST https://api.kit.com/v4/forms/{form_id}/subscribers
   Auth headers tried (Kit accepts at least one):
     Authorization: Bearer kit_xxx
     X-Kit-Api-Key:  kit_xxx
   Body:
     { "email_address": "..." }
   Success:
     201 Created with { "subscriber": {...} }

   The form's Auto-confirm setting in Kit is ON, so the Incentive
   Email (with the RENACER PDF link) goes out to the subscriber
   immediately.

   API key lives in the env var KIT_API_KEY when available, falling
   back to the in-repo value for the private repo's convenience.
   ─────────────────────────────────────────────────────────────────── */

const KIT_API_KEY =
  process.env.KIT_API_KEY || "kit_330ba495baf2303d1e31f07832d51467";
const KIT_FORM_ID = "672196ab87";
const KIT_ENDPOINT = `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`;

export const runtime = "edge";

type AttemptResult = {
  auth: string;
  status: number;
  body: unknown;
};

async function attempt(
  authLabel: string,
  headers: Record<string, string>,
  email: string
): Promise<AttemptResult> {
  const res = await fetch(KIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...headers,
    },
    body: JSON.stringify({ email_address: email }),
  });
  const body = await res.json().catch(() => null);
  return { auth: authLabel, status: res.status, body };
}

function isSuccess(r: AttemptResult): boolean {
  if (r.status < 200 || r.status >= 300) return false;
  if (!r.body || typeof r.body !== "object") return false;
  const b = r.body as Record<string, unknown>;
  return Boolean(b.subscriber);
}

/* GET handler · diagnostic only. Visiting /api/subscribe?test=1 runs
   the same multi-auth subscribe against Kit with a deterministic
   test email, and returns the full attempts array as JSON. Lets
   Amigo inspect what Kit is actually rejecting without needing the
   browser DevTools dance. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("test") !== "1") {
    return NextResponse.json({ ok: false, error: "method_not_allowed" }, {
      status: 405,
    });
  }

  // First diagnostic round told us: Kit v4 rejects Bearer auth
  // (401 invalid token) but accepts X-Kit-Api-Key (returned a clean
  // 404 Not Found for the public UID). So fetch the forms listing
  // with X-Kit-Api-Key to learn the v4 internal numeric form IDs.
  const formsRes = await fetch("https://api.kit.com/v4/forms", {
    headers: {
      "X-Kit-Api-Key": KIT_API_KEY,
      Accept: "application/json",
    },
  }).catch(() => null as unknown);

  let formsListing: unknown = null;
  if (formsRes && typeof formsRes === "object" && "json" in formsRes) {
    formsListing = await (formsRes as Response).json().catch(() => null);
  }

  const testEmail = `amigo+test${Date.now()}@drgisseledonovan.com`;
  const attempts: AttemptResult[] = [];

  const bearer = await attempt(
    "bearer",
    { Authorization: `Bearer ${KIT_API_KEY}` },
    testEmail
  ).catch((e) => ({ auth: "bearer", status: 0, body: { error: String(e) } }));
  attempts.push(bearer);

  const xKey = await attempt(
    "x-kit-api-key",
    { "X-Kit-Api-Key": KIT_API_KEY },
    testEmail
  ).catch((e) => ({
    auth: "x-kit-api-key",
    status: 0,
    body: { error: String(e) },
  }));
  attempts.push(xKey);

  return NextResponse.json({
    ok: false,
    note: "diagnostic only — visit ?test=1",
    formEndpoint: KIT_ENDPOINT,
    formsListing,
    attempts,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "invalid_email" },
        { status: 400 }
      );
    }

    const attempts: AttemptResult[] = [];

    // Bearer is the documented OAuth-style auth for Kit v4 personal keys
    const bearer = await attempt(
      "bearer",
      { Authorization: `Bearer ${KIT_API_KEY}` },
      email
    ).catch((e) => ({ auth: "bearer", status: 0, body: { error: String(e) } }));
    attempts.push(bearer);
    if (isSuccess(bearer)) return NextResponse.json({ ok: true });

    // Fallback: X-Kit-Api-Key header
    const xKey = await attempt(
      "x-kit-api-key",
      { "X-Kit-Api-Key": KIT_API_KEY },
      email
    ).catch((e) => ({
      auth: "x-kit-api-key",
      status: 0,
      body: { error: String(e) },
    }));
    attempts.push(xKey);
    if (isSuccess(xKey)) return NextResponse.json({ ok: true });

    // Final fallback: HTTP Basic Auth (key as username, empty password)
    const basicToken = btoa(`${KIT_API_KEY}:`);
    const basic = await attempt(
      "basic",
      { Authorization: `Basic ${basicToken}` },
      email
    ).catch((e) => ({ auth: "basic", status: 0, body: { error: String(e) } }));
    attempts.push(basic);
    if (isSuccess(basic)) return NextResponse.json({ ok: true });

    return NextResponse.json(
      { ok: false, error: "kit_rejected", attempts },
      { status: 502 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: "server_error",
        message: err instanceof Error ? err.message : "unknown",
      },
      { status: 500 }
    );
  }
}
