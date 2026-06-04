import { NextResponse } from "next/server";

/* ─── /api/subscribe ──────────────────────────────────────────────────
   Server-side proxy to Kit (ConvertKit). The browser used to POST
   directly to Kit's form endpoint with mode: "no-cors", which works
   for native HTML forms but silently swallows every error for fetch
   calls. Moving the submission server-side gives us real HTTP
   status codes, real error bodies, and lets us return a clean JSON
   response back to the React form.

   Form ID: 672196ab87
   Endpoint: https://app.kit.com/forms/{id}/subscriptions
   Auto-confirm is enabled in Kit so the subscriber gets the RENACER
   Incentive Email immediately on subscribe.
   ─────────────────────────────────────────────────────────────────── */

const KIT_FORM_ID = "672196ab87";
const KIT_ENDPOINT = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`;

export const runtime = "edge"; // fast, free, Vercel-native

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

    // Kit's form endpoint accepts url-encoded form data
    const form = new URLSearchParams();
    form.set("email_address", email);

    const kitRes = await fetch(KIT_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: form.toString(),
    });

    /* Kit returns 200 with HTML on success (their thank-you page),
       or a redirect (3xx). Both indicate the email was accepted.
       4xx/5xx mean the submission failed. */
    if (kitRes.status >= 200 && kitRes.status < 400) {
      return NextResponse.json({ ok: true });
    }

    const detail = await kitRes.text().catch(() => "");
    return NextResponse.json(
      {
        ok: false,
        error: "kit_rejected",
        status: kitRes.status,
        detail: detail.slice(0, 500),
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
