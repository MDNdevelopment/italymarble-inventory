"use client";

import { useEffect, useState } from "react";
import { fetchSlabCounts } from "@/utils/supabaseQueries";

export function useSlabCounts() {
  const [totalCount, setTotalCount] = useState(0);
  const [materialCounts, setMaterialCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSlabCounts().then(({ data, error }) => {
      if (!error && data) {
        setTotalCount(data.length);
        const counts = data.reduce<Record<string, number>>((acc, row) => {
          acc[row.material_index] = (acc[row.material_index] ?? 0) + 1;
          return acc;
        }, {});
        setMaterialCounts(counts);
      }
      setLoading(false);
    });
  }, []);

  return { totalCount, materialCounts, loading };
}
