"use client";

import { useState } from "react";
import { useFilters } from "@/hooks/useFilters";
import { useFilteredSlabs } from "@/hooks/useSlabs";
import { useFilterOptions } from "@/hooks/useFilterOptions";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import Sidebar from "./sidebar/Sidebar";
import MobileFilterDrawer from "./sidebar/MobileFilterDrawer";
import ProductGrid from "./grid/ProductGrid";
import ProductGridSkeleton from "./grid/ProductGridSkeleton";
import Pagination from "./Pagination";
import CatalogHeader from "./CatalogHeader";

const PAGE_SIZE = 6;

export default function CatalogPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const {
    availableColors,
    availableMaterials,
    availableFinishes,
    priceRange: dbPriceRange,
    materialCounts,
    totalCount,
  } = useFilterOptions();

  const {
    filters,
    toggleColor,
    toggleMaterial,
    toggleFinish,
    setPriceRange,
    reset,
  } = useFilters(dbPriceRange);

  const debouncedFilters = useDebouncedValue(filters);
  const {
    slabs,
    currentPage,
    totalPages,
    totalFilteredCount,
    loading,
    error,
    goToPage,
    nextPage,
    prevPage,
  } = useFilteredSlabs(debouncedFilters, PAGE_SIZE);

  return (
    <main className="min-h-screen bg-background">
      {/* Main content */}
      <div className="max-w-360 mx-auto px-8 py-10">
        {error && (
          <p className="text-red-500 text-sm mb-4">
            Failed to load slabs: {error}
          </p>
        )}
        <div className="flex gap-12">
          {/* Sidebar — hidden on mobile */}
          <div className="hidden lg:block">
            <Sidebar
              availableColors={availableColors}
              availableMaterials={availableMaterials}
              availableFinishes={availableFinishes}
              priceBounds={dbPriceRange}
              materialCounts={materialCounts}
              filters={filters}
              onToggleColor={toggleColor}
              onToggleMaterial={toggleMaterial}
              onToggleFinish={toggleFinish}
              onSetPriceRange={setPriceRange}
              onReset={reset}
            />
          </div>

          {/* Catalog content */}
          <div className="flex-1 min-w-0">
            <CatalogHeader
              totalCount={totalCount}
              filteredCount={totalFilteredCount}
              onOpenFilters={() => setMobileFiltersOpen(true)}
            />
            {loading ? (
              <ProductGridSkeleton count={PAGE_SIZE} />
            ) : (
              <ProductGrid slabs={slabs} />
            )}
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

      <MobileFilterDrawer
        isOpen={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
      >
        <Sidebar
          variant="mobile"
          availableColors={availableColors}
          availableMaterials={availableMaterials}
          availableFinishes={availableFinishes}
          priceBounds={dbPriceRange}
          materialCounts={materialCounts}
          filters={filters}
          onToggleColor={toggleColor}
          onToggleMaterial={toggleMaterial}
          onToggleFinish={toggleFinish}
          onSetPriceRange={setPriceRange}
          onReset={reset}
        />
      </MobileFilterDrawer>
    </main>
  );
}
