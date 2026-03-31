import { Resend } from "resend";
import { CustomerFields, QuotePayload } from "@/utils/quoteValidation";
import { Slab } from "@/utils/types";

const resend = new Resend(process.env.RESEND_API_KEY);

function slabRows(slabs: Slab[]): string {
  return slabs
    .map(
      (s) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2928">${s.product_code}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2928">${s.material_index}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2928">${s.surface_index}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2928">${s.length} × ${s.width} cm</td>
        <td style="padding:8px 12px;border-bottom:1px solid #2a2928">${s.thickness}cm</td>
      </tr>`,
    )
    .join("");
}

function baseStyle(content: string): string {
  return `
    <div style="font-family:'Manrope',sans-serif;background:#0e0d0c;color:#f0ede8;max-width:640px;margin:0 auto;padding:32px">
      <h1 style="font-size:22px;font-weight:700;margin-bottom:24px;letter-spacing:0.05em">ITALY MARBLE & GRANITE</h1>
      ${content}
    </div>
  `;
}

export async function sendAdminQuoteEmail(payload: QuotePayload) {
  const { customer, slabs } = payload;

  const html = baseStyle(`
    <h2 style="font-size:16px;font-weight:600;margin-bottom:16px">New Quote Request from ${customer.name}</h2>

    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      <tr><td style="padding:6px 12px;color:#9e9891;width:120px">Name</td><td style="padding:6px 12px">${customer.name}</td></tr>
      <tr><td style="padding:6px 12px;color:#9e9891">Email</td><td style="padding:6px 12px"><a href="mailto:${customer.email}" style="color:#ffffff">${customer.email}</a></td></tr>
      ${customer.phone ? `<tr><td style="padding:6px 12px;color:#9e9891">Phone</td><td style="padding:6px 12px">${customer.phone}</td></tr>` : ""}
      ${customer.company ? `<tr><td style="padding:6px 12px;color:#9e9891">Company</td><td style="padding:6px 12px">${customer.company}</td></tr>` : ""}
      ${customer.message ? `<tr><td style="padding:6px 12px;color:#9e9891;vertical-align:top">Message</td><td style="padding:6px 12px">${customer.message}</td></tr>` : ""}
    </table>

    <h3 style="font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px">Requested Slabs (${slabs.length})</h3>
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead>
        <tr style="color:#9e9891;font-size:11px;letter-spacing:0.08em;text-transform:uppercase">
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Code</th>
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Material</th>
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Finish</th>
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Dimensions</th>
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Thickness</th>
        </tr>
      </thead>
      <tbody>${slabRows(slabs)}</tbody>
    </table>
  `);

  console.log({
    from: process.env.FROM_EMAIL,
    to: process.env.ADMIN_EMAIL,
    key: process.env.RESEND_API_KEY,
  });
  return resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: process.env.ADMIN_EMAIL!,
    subject: `New Quote Request from ${customer.name}`,
    html,
  });
}

export async function sendCustomerConfirmationEmail(
  customer: CustomerFields,
  slabs: Slab[],
) {
  const html = baseStyle(`
    <h2 style="font-size:16px;font-weight:600;margin-bottom:8px">Your Quote Request</h2>
    <p style="color:#9e9891;margin-bottom:24px">Hi ${customer.name}, we have received your request and will get back to you within 24 hours.</p>

    <h3 style="font-size:13px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px">Requested Slabs (${slabs.length})</h3>
    <table style="width:100%;border-collapse:collapse;font-size:13px">
      <thead>
        <tr style="color:#9e9891;font-size:11px;letter-spacing:0.08em;text-transform:uppercase">
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Code</th>
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Material</th>
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Finish</th>
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Dimensions</th>
          <th style="padding:8px 12px;text-align:left;border-bottom:1px solid #3a3733">Thickness</th>
        </tr>
      </thead>
      <tbody>${slabRows(slabs)}</tbody>
    </table>

    <p style="margin-top:24px;color:#9e9891;font-size:13px">
      If you have any questions, reply to this email or contact us directly.
    </p>
  `);

  return resend.emails.send({
    from: process.env.FROM_EMAIL!,
    to: customer.email,
    subject: "Your Quote Request — Stone Gallery",
    html,
  });
}
