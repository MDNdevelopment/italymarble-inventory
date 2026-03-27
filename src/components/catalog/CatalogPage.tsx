"use client";

import { useFilters } from "@/hooks/useFilters";
import { usePagination } from "@/hooks/usePagination";
import { mockSlabs } from "@/utils/mockData";
import { filterSlabs, paginateSlabs } from "@/utils/slabFilters";
import Sidebar from "./sidebar/Sidebar";
import CatalogHeader from "./CatalogHeader";
import ProductGrid from "./grid/ProductGrid";
import Pagination from "./Pagination";

const PAGE_SIZE = 6;

export default function CatalogPage() {
  const { filters, toggleColor, toggleMaterial, toggleFinish, reset } =
    useFilters();

  const filteredSlabs = filterSlabs(mockSlabs, filters);
  const { currentPage, totalPages, goToPage, nextPage, prevPage } =
    usePagination(filteredSlabs.length, PAGE_SIZE);
  const pageSlabs = paginateSlabs(filteredSlabs, currentPage, PAGE_SIZE);

  return (
    <main className="min-h-screen bg-background">
      {/* Hero band */}

      {/* Main content */}
      <div className="max-w-[1440px] mx-auto px-8 py-10">
        <div className="flex gap-12">
          {/* Sidebar — hidden on mobile */}
          <div className="hidden lg:block">
            <Sidebar
              filters={filters}
              onToggleColor={toggleColor}
              onToggleMaterial={toggleMaterial}
              onToggleFinish={toggleFinish}
              onReset={reset}
            />
          </div>

          {/* Catalog content */}
          <div className="flex-1 min-w-0">
            <CatalogHeader
              totalCount={mockSlabs.length}
              filteredCount={filteredSlabs.length}
            />
            <ProductGrid slabs={pageSlabs} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onGoToPage={goToPage}
              onNextPage={nextPage}
              onPrevPage={prevPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
