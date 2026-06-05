import { NextResponse } from "next/server";

/* ─── /api/subscribe ──────────────────────────────────────────────────
   Server-side proxy to Kit's v4 Forms API. Subscribes the visitor to
   the RENACER GUIDE form; the form's Auto-confirm setting in Kit is
   ON, so the Incentive Email (with the RENACER PDF link) is sent to
   the subscriber immediately.

   Discovery notes (the path that worked):
   1. v3 Legacy API was deprecated — endpoints silently rejected
      Dr. Gissele's v3 key.
   2. v4 Bearer auth returns 401 "The access token is invalid" for
      personal-use API keys — Bearer is reserved for OAuth tokens.
   3. v4 X-Kit-Api-Key header is the correct auth scheme.
   4. The "form ID" in v4 is NOT the public UID (672196ab87) used in
      the embed code; v4 uses the internal numeric ID. Hitting
      GET /v4/forms with X-Kit-Api-Key revealed the right one:
      id 9523787, name "RENACER GUIDE form", uid 672196ab87.

   Endpoint: POST https://api.kit.com/v4/forms/9523787/subscribers
   Auth:     X-Kit-Api-Key: kit_xxx
   Body:     { "email_address": "..." }
   Success:  201 Created with { "subscriber": {...} }
   ─────────────────────────────────────────────────────────────────── */

const KIT_API_KEY =
  process.env.KIT_API_KEY || "kit_330ba495baf2303d1e31f07832d51467";
const KIT_FORM_ID = 9523787;
const KIT_ENDPOINT = `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`;

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    const email =
      typeof payload?.email === "string"
        ? payload.email.trim().toLowerCase()
        : "";

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: "invalid_email" },
        { status: 400 }
      );
    }

    const kitRes = await fetch(KIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Kit-Api-Key": KIT_API_KEY,
      },
      body: JSON.stringify({ email_address: email }),
    });

    const data = (await kitRes.json().catch(() => null)) as {
      subscriber?: { id?: number };
      errors?: string[];
    } | null;

    if (kitRes.ok && data?.subscriber) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "kit_rejected",
        status: kitRes.status,
        detail: data,
      },
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

/* GET diagnostic kept for future investigation. Visit
   /api/subscribe?test=1 to see what Kit thinks of the current setup. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("test") !== "1") {
    return NextResponse.json(
      { ok: false, error: "method_not_allowed" },
      { status: 405 }
    );
  }

  const testEmail = `amigo+test${Date.now()}@drgisseledonovan.com`;
  const kitRes = await fetch(KIT_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "X-Kit-Api-Key": KIT_API_KEY,
    },
    body: JSON.stringify({ email_address: testEmail }),
  });
  const body = await kitRes.json().catch(() => null);

  return NextResponse.json({
    note: "diagnostic only — visit ?test=1",
    endpoint: KIT_ENDPOINT,
    testEmail,
    status: kitRes.status,
    body,
  });
}
