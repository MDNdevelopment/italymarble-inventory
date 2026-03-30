import { Slab } from "@/utils/types";

export interface CustomerFields {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message?: string;
}

export interface QuotePayload {
  customer: CustomerFields;
  slabs: Slab[];
}

export function validateQuotePayload(body: unknown): { valid: true; payload: QuotePayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const { customer, slabs } = body as Record<string, unknown>;

  if (!customer || typeof customer !== "object") {
    return { valid: false, error: "Missing customer details." };
  }

  const c = customer as Record<string, unknown>;

  if (!c.name || typeof c.name !== "string" || c.name.trim().length === 0) {
    return { valid: false, error: "Customer name is required." };
  }

  if (!c.email || typeof c.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) {
    return { valid: false, error: "A valid email address is required." };
  }

  if (!Array.isArray(slabs) || slabs.length === 0) {
    return { valid: false, error: "At least one slab must be included." };
  }

  return {
    valid: true,
    payload: {
      customer: {
        name: c.name.trim(),
        email: c.email.trim(),
        phone: typeof c.phone === "string" ? c.phone.trim() : undefined,
        company: typeof c.company === "string" ? c.company.trim() : undefined,
        message: typeof c.message === "string" ? c.message.trim() : undefined,
      },
      slabs: slabs as Slab[],
    },
  };
}
