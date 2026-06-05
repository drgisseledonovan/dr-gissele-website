import { NextResponse } from "next/server";

/* ─── /api/subscribe ──────────────────────────────────────────────────
   Server-side proxy to Kit's v3 Forms API. This is the documented,
   supported way to add a subscriber from an external website.

   Why this exists, and why it replaced the earlier iframe approach:
   the legacy /forms/{id}/subscriptions endpoint that the iframe form
   POST hit silently accepted submissions from external origins, but
   stopped reliably routing them through to Kit after their rebrand.
   The v3 API endpoint takes a documented JSON payload, returns clean
   error codes, and runs server-side so there are no CORS or referrer
   surprises.

   Endpoint: POST https://api.convertkit.com/v3/forms/{form_id}/subscribe
   Body:     { "api_key": "...", "email": "..." }

   Kit auto-confirm is enabled on this form, so the Incentive Email
   (with the RENACER PDF link) is sent to the subscriber immediately.
   ─────────────────────────────────────────────────────────────────── */

const KIT_API_KEY =
  process.env.KIT_API_KEY || "GHQwLXqJZt-h1cLYVbikbQ";
const KIT_FORM_ID = "672196ab87";
const KIT_ENDPOINT = `https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`;

export const runtime = "edge";

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

    const kitRes = await fetch(KIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        api_key: KIT_API_KEY,
        email,
      }),
    });

    const data = (await kitRes.json().catch(() => null)) as
      | { subscription?: { id?: number; subscriber?: { id?: number } } }
      | { error?: string; message?: string }
      | null;

    /* Kit returns 200 with a `subscription` object when the subscriber
       is added (or already exists). Auto-confirm in the form settings
       ensures the Incentive Email goes out instantly. */
    if (
      kitRes.ok &&
      data &&
      "subscription" in data &&
      data.subscription
    ) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "kit_rejected",
        status: kitRes.status,
        detail: data ?? null,
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
