interface CatalogHeaderProps {
  totalCount: number;
  filteredCount: number;
}

export default function CatalogHeader({ totalCount, filteredCount }: CatalogHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <p className="text-primary text-[10px] tracking-[0.3em] uppercase mb-2">
          Premium Natural Stone
        </p>
        <h1 className="font-headline text-3xl font-bold text-on-background tracking-tight">
          Curated Collection
        </h1>
        <p className="text-on-surface-variant text-sm mt-2">
          Showing{" "}
          <span className="text-on-surface font-medium">{filteredCount}</span>{" "}
          of {totalCount} slabs
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <label className="text-on-surface-variant text-xs tracking-wider sr-only">
          Sort by
        </label>
        <div className="relative">
          <select
            className="appearance-none bg-surface-container border border-outline-variant text-on-surface text-sm pl-4 pr-9 py-2 rounded-sm focus:outline-none focus:border-primary transition-colors cursor-pointer"
            defaultValue="featured"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
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
