"use client";

import { useEffect, useState } from "react";
import { fetchSlabCounts } from "@/utils/supabaseQueries";

interface FilterOptions {
  availableColors: string[];
  availableMaterials: string[];
  availableFinishes: string[];
  materialCounts: Record<string, number>;
  totalCount: number;
  loading: boolean;
}

export function useFilterOptions(): FilterOptions {
  const [availableColors, setAvailableColors] = useState<string[]>([]);
  const [availableMaterials, setAvailableMaterials] = useState<string[]>([]);
  const [availableFinishes, setAvailableFinishes] = useState<string[]>([]);
  const [materialCounts, setMaterialCounts] = useState<Record<string, number>>({});
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlabCounts().then(({ data, error }) => {
      if (!error && data) {
        setTotalCount(data.length);

        const counts: Record<string, number> = {};
        const colorsSet = new Set<string>();
        const materialsSet = new Set<string>();
        const finishesSet = new Set<string>();

        for (const row of data) {
          if (row.material_index) {
            counts[row.material_index] = (counts[row.material_index] ?? 0) + 1;
            materialsSet.add(row.material_index);
          }
          if (row.ind_tag) colorsSet.add(row.ind_tag);
          if (row.surface_index) finishesSet.add(row.surface_index);
        }

        setMaterialCounts(counts);
        setAvailableColors(Array.from(colorsSet).sort());
        setAvailableMaterials(Array.from(materialsSet).sort());
        setAvailableFinishes(Array.from(finishesSet).sort());
      }
      setLoading(false);
    });
  }, []);

  return {
    availableColors,
    availableMaterials,
    availableFinishes,
    materialCounts,
    totalCount,
    loading,
  };
}
