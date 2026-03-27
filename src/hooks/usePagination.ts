import { useEffect, useState } from "react";
import { getTotalPages } from "@/utils/slabFilters";

export function usePagination(totalItems: number, pageSize: number) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = getTotalPages(totalItems, pageSize);

  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]);

  const goToPage = (page: number) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  return { currentPage, totalPages, goToPage, nextPage, prevPage };
}
