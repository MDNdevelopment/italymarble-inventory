interface CatalogHeaderProps {
  totalCount: number;
  filteredCount: number;
  onOpenFilters?: () => void;
}

export default function CatalogHeader({
  totalCount,
  filteredCount,
  onOpenFilters,
}: CatalogHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-2">
          Premium Natural Stone
        </p>
        <h1 className="font-headline text-3xl font-black text-on-background tracking-tight uppercase">
          Curated Collection
        </h1>
        <p className="text-on-surface-variant text-sm mt-2">
          Showing{" "}
          <span className="text-on-surface font-medium">{filteredCount}</span>{" "}
          of {totalCount} slabs
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenFilters}
          className="lg:hidden flex items-center gap-1.5 border border-outline text-primary text-sm px-3 py-2 cursor-pointer hover:border-primary transition-colors"
          aria-label="Open filters"
        >
          <span className="material-symbols-outlined text-[16px]">tune</span>
          Filters
        </button>
        <label className="text-on-surface-variant text-xs tracking-wider sr-only">
          Sort by
        </label>
        <div className="relative">
          <select
            className="appearance-none  border border-outline text-primary text-sm pl-4 pr-9 py-2 focus:outline-none focus:border-primary transition-colors cursor-pointer"
            defaultValue="featured"
          >
            <option value="featured">Featured</option>
            <option value="name-asc">Name: A–Z</option>
            <option value="newest">Newest First</option>
          </select>
          <span className="material-symbols-outlined text-[16px] text-on-surface-variant absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none">
            expand_more
          </span>
        </div>
      </div>
    </div>
  );
}
