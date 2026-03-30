"use client";

import { useEffect, useState } from "react";
import { fetchFilteredSlabs } from "@/utils/supabaseQueries";
import { FilterState, Slab } from "@/utils/types";

export function useFilteredSlabs(filters: FilterState, pageSize: number) {
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFilteredCount, setTotalFilteredCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);

  useEffect(() => {
    let stale = false;
    setLoading(true);

    fetchFilteredSlabs(filters, currentPage, pageSize).then(({ data, count, error }) => {
      if (stale) return;
      if (error) {
        setError(error.message);
      } else {
        setSlabs(data ?? []);
        setTotalFilteredCount(count ?? 0);
        setError(null);
      }
      setLoading(false);
    });

    return () => {
      stale = true;
    };
  }, [filters, currentPage, pageSize]);

  const totalPages = Math.max(1, Math.ceil(totalFilteredCount / pageSize));

  const goToPage = (page: number) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return {
    slabs,
    currentPage,
    totalPages,
    totalFilteredCount,
    loading,
    error,
    goToPage,
    nextPage,
    prevPage,
  };
}
