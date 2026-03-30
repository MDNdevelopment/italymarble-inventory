import { SlabRow } from "@/utils/types";

export interface SyncPayload {
  upsert?: SlabRow[];
  remove?: string[];
}

export function validateSyncPayload(
  body: unknown
): { valid: true; payload: SyncPayload } | { valid: false; error: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body." };
  }

  const { upsert, remove } = body as Record<string, unknown>;

  if (upsert === undefined && remove === undefined) {
    return { valid: false, error: "At least one of 'upsert' or 'remove' must be provided." };
  }

  if (upsert !== undefined) {
    if (!Array.isArray(upsert)) {
      return { valid: false, error: "'upsert' must be an array." };
    }
    for (let i = 0; i < upsert.length; i++) {
      const item = upsert[i] as Record<string, unknown>;
      if (!item.product_code || typeof item.product_code !== "string" || item.product_code.trim().length === 0) {
        return { valid: false, error: `upsert[${i}] is missing a valid product_code.` };
      }
    }
  }

  if (remove !== undefined) {
    if (!Array.isArray(remove)) {
      return { valid: false, error: "'remove' must be an array." };
    }
    for (let i = 0; i < remove.length; i++) {
      if (typeof remove[i] !== "string" || (remove[i] as string).trim().length === 0) {
        return { valid: false, error: `remove[${i}] must be a non-empty string.` };
      }
    }
  }

  return {
    valid: true,
    payload: {
      upsert: upsert as SlabRow[] | undefined,
      remove: remove as string[] | undefined,
    },
  };
}
