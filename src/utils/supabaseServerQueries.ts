import { createClient } from "@/utils/supabase/server";
import { Slab } from "@/utils/types";

export async function fetchSlabByProductCode(
  productCode: string
): Promise<Slab | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("slabs")
    .select("*")
    .eq("product_code", productCode)
    .eq("inactive", false)
    .single();

  if (error || !data) return null;
  return data as Slab;
}

export async function fetchSimilarSlabs(
  materialIndex: string,
  excludeId: number,
  limit = 3
): Promise<Slab[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("slabs")
    .select("*")
    .eq("material_index", materialIndex)
    .eq("inactive", false)
    .neq("id", excludeId)
    .limit(limit);

  if (error || !data) return [];
  return data as Slab[];
}
