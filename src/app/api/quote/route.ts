import { NextRequest, NextResponse } from "next/server";
import { validateQuotePayload } from "@/utils/quoteValidation";
import { sendAdminQuoteEmail, sendCustomerConfirmationEmail } from "@/utils/emailService";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = validateQuotePayload(body);
  if (!result.valid) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  const { payload } = result;

  try {
    await Promise.all([
      sendAdminQuoteEmail(payload),
      sendCustomerConfirmationEmail(payload.customer, payload.slabs),
    ]);
  } catch (err) {
    console.error("Email send failed:", err);
    return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
