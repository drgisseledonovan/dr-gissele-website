import { NextResponse } from "next/server";

/* ─── /api/subscribe ──────────────────────────────────────────────────
   Server-side proxy that adds a visitor to the RENACER GUIDE form in
   Kit. Subscribing the visitor to that specific form is what triggers
   Kit's Incentive Email (with the RENACER PDF) for delivery.

   Kit v4 API requires two calls:
     1. POST /v4/subscribers · creates the subscriber globally
        (idempotent — returns the existing record if the email is
        already on file).
     2. POST /v4/forms/{form_id}/subscribers · adds the subscriber to
        the RENACER form, which fires the form's auto-confirm and
        Incentive Email.

   If step 2 is called for an email that doesn't yet exist as a
   subscriber, Kit returns 404. That's why both calls are needed.

   This was confirmed through three rounds of API probing on
   2026-06-06. The working body shape for both endpoints is just
   `{ "email_address": "..." }`. Auth is `X-Kit-Api-Key` header.
   Bearer auth is rejected with "The access token is invalid" by
   Kit's v4 API for personal-use API keys.
   ─────────────────────────────────────────────────────────────────── */

const KIT_API_KEY =
  process.env.KIT_API_KEY || "kit_330ba495baf2303d1e31f07832d51467";
const KIT_FORM_ID = 9523787; // internal numeric ID for "RENACER GUIDE form"

const SUBSCRIBERS_ENDPOINT = "https://api.kit.com/v4/subscribers";
const FORM_SUBSCRIBE_ENDPOINT = `https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers`;

const KIT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Kit-Api-Key": KIT_API_KEY,
};

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

    // Step 1 · ensure the subscriber exists in Kit globally.
    // Idempotent: returns the existing subscriber if already present.
    await fetch(SUBSCRIBERS_ENDPOINT, {
      method: "POST",
      headers: KIT_HEADERS,
      body: JSON.stringify({ email_address: email }),
    }).catch(() => null);

    // Step 2 · add the subscriber to the RENACER form. This is what
    // triggers Kit's Incentive Email containing the RENACER PDF.
    const formRes = await fetch(FORM_SUBSCRIBE_ENDPOINT, {
      method: "POST",
      headers: KIT_HEADERS,
      body: JSON.stringify({ email_address: email }),
    });

    const formData = (await formRes.json().catch(() => null)) as {
      subscriber?: { id?: number; added_at?: string };
      errors?: string[];
    } | null;

    if (formRes.ok && formData?.subscriber?.id) {
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json(
      {
        ok: false,
        error: "form_subscribe_failed",
        status: formRes.status,
        detail: formData,
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

/* GET diagnostic kept minimal: hits the live flow with a test
   email and returns the result so we can verify the route is
   healthy at any time. Visit /api/subscribe?test=1. */
export async function GET(request: Request) {
  const url = new URL(request.url);
  if (url.searchParams.get("test") !== "1") {
    return NextResponse.json(
      { ok: false, error: "method_not_allowed" },
      { status: 405 }
    );
  }

  const testEmail = `amigo+test${Date.now()}@drgisseledonovan.com`;

  const createRes = await fetch(SUBSCRIBERS_ENDPOINT, {
    method: "POST",
    headers: KIT_HEADERS,
    body: JSON.stringify({ email_address: testEmail }),
  });
  const createBody = await createRes.json().catch(() => null);

  const formRes = await fetch(FORM_SUBSCRIBE_ENDPOINT, {
    method: "POST",
    headers: KIT_HEADERS,
    body: JSON.stringify({ email_address: testEmail }),
  });
  const formBody = await formRes.json().catch(() => null);

  return NextResponse.json({
    note: "diagnostic only — visit ?test=1",
    testEmail,
    step1_create: { status: createRes.status, body: createBody },
    step2_form: { status: formRes.status, body: formBody },
  });
}
