import { NextResponse } from "next/server";

/* ─── /api/subscribe ──────────────────────────────────────────────────
   Server-side proxy to Kit. Tries Kit's v4 API first (the modern one,
   matches Dr. Gissele's API key format), falls back to v3 if v4
   rejects. Returns whichever succeeds. Detailed error info on failure
   so we can diagnose quickly from the browser's Network tab.

   v4 (new):
     POST https://api.kit.com/v4/forms/{form_id}/subscribers
     Header: X-Kit-Api-Key: {key}
     Body:   { "email_address": "..." }

   v3 (legacy):
     POST https://api.convertkit.com/v3/forms/{form_id}/subscribe
     Body: { "api_key": "{key}", "email": "..." }

   Both endpoints honor the form's Incentive Email + Auto-confirm
   settings, so the RENACER PDF goes out to the subscriber instantly.
   ─────────────────────────────────────────────────────────────────── */

const KIT_API_KEY =
  process.env.KIT_API_KEY || "GHQwLXqJZt-h1cLYVbikbQ";
const KIT_FORM_ID = "672196ab87";

export const runtime = "edge";

type AttemptResult = {
  endpoint: string;
  status: number;
  body: unknown;
};

async function tryV4(email: string): Promise<AttemptResult> {
  const url = `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Kit-Api-Key": KIT_API_KEY,
      Accept: "application/json",
    },
    body: JSON.stringify({ email_address: email }),
  });
  const body = await res.json().catch(() => null);
  return { endpoint: "v4", status: res.status, body };
}

async function tryV4Bearer(email: string): Promise<AttemptResult> {
  const url = `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${KIT_API_KEY}`,
      Accept: "application/json",
    },
    body: JSON.stringify({ email_address: email }),
  });
  const body = await res.json().catch(() => null);
  return { endpoint: "v4-bearer", status: res.status, body };
}

async function tryV3(email: string): Promise<AttemptResult> {
  const url = `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ api_key: KIT_API_KEY, email }),
  });
  const body = await res.json().catch(() => null);
  return { endpoint: "v3", status: res.status, body };
}

function looksLikeSuccess(r: AttemptResult): boolean {
  if (r.status < 200 || r.status >= 300) return false;
  if (!r.body || typeof r.body !== "object") return false;
  const b = r.body as Record<string, unknown>;
  // v3 returns { subscription: {...} }; v4 returns { subscriber: {...} }
  return Boolean(b.subscription || b.subscriber);
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

    // Try v4 with X-Kit-Api-Key header first (matches modern key format)
    const v4 = await tryV4(email).catch((e) => ({
      endpoint: "v4",
      status: 0,
      body: { error: String(e) },
    }));
    attempts.push(v4);
    if (looksLikeSuccess(v4)) {
      return NextResponse.json({ ok: true, endpoint: v4.endpoint });
    }

    // Try v4 with Bearer auth as backup
    const v4b = await tryV4Bearer(email).catch((e) => ({
      endpoint: "v4-bearer",
      status: 0,
      body: { error: String(e) },
    }));
    attempts.push(v4b);
    if (looksLikeSuccess(v4b)) {
      return NextResponse.json({ ok: true, endpoint: v4b.endpoint });
    }

    // Fall back to v3 with api_key in body
    const v3 = await tryV3(email).catch((e) => ({
      endpoint: "v3",
      status: 0,
      body: { error: String(e) },
    }));
    attempts.push(v3);
    if (looksLikeSuccess(v3)) {
      return NextResponse.json({ ok: true, endpoint: v3.endpoint });
    }

    // Every approach failed · return full diagnostic detail
    return NextResponse.json(
      {
        ok: false,
        error: "kit_rejected",
        attempts,
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
