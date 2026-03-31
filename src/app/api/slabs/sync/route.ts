import { NextRequest, NextResponse } from "next/server";
import { validateSyncPayload } from "@/utils/syncValidation";
import { supabaseAdmin } from "@/utils/supabase/admin";

export async function POST(req: NextRequest) {
  const apiKey = req.headers.get("x-api-key");
  if (!apiKey || apiKey !== process.env.SLAB_SYNC_API_KEY) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = validateSyncPayload(body);
  if (!result.valid) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  const { payload } = result;
  let upserted = 0;
  let removed = 0;

  try {
    if (payload.upsert && payload.upsert.length > 0) {
      const rows = payload.upsert.map((row) => ({ inactive: false, ...row }));
      const { error } = await supabaseAdmin
        .from("slabs")
        .upsert(rows, { onConflict: "product_code" });
      if (error) throw error;
      upserted = rows.length;
    }

    if (payload.remove && payload.remove.length > 0) {
      const { error } = await supabaseAdmin
        .from("slabs")
        .update({ inactive: true })
        .in("product_code", payload.remove);
      if (error) throw error;
      removed = payload.remove.length;
    }
  } catch (err) {
    console.error("Sync DB error:", err);
    return NextResponse.json({ error: "Database operation failed." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, summary: { upserted, removed } });
}
