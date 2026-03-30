import { createClient } from "@/utils/supabase/client";
import { FilterState } from "@/utils/types";

export async function fetchFilteredSlabs(
  filters: FilterState,
  page: number,
  pageSize: number,
) {
  const supabase = createClient();

  let query = supabase
    .from("slabs")
    .select(
      "id, product_code, material_index, surface_index, thickness, quality, length, width, length_net, width_net, unit, picture_ref, picture_s_ref, surface_area, contour_file, ind_tag, inactive, quantity",
      {
        count: "exact",
      },
    )
    .eq("inactive", false);

  if (filters.colors.length > 0) {
    query = query.in("ind_tag", filters.colors);
  }
  if (filters.materials.length > 0) {
    query = query.in("material_index", filters.materials);
  }
  if (filters.finishes.length > 0) {
    query = query.in("surface_index", filters.finishes);
  }

  query = query
    .gte("value", filters.priceRange[0])
    .lte("value", filters.priceRange[1]);

  const from = (page - 1) * pageSize;
  const to = page * pageSize - 1;

  const { data, count, error } = await query.range(from, to).order("id");

  return { data, count, error };
}

export async function fetchSlabCounts() {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("slabs")
    .select("material_index, ind_tag, surface_index, value")
    .eq("inactive", false);

  return { data, error };
}
