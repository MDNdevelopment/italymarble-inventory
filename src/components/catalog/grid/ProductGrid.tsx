import { Slab } from "@/utils/types";
import SlabCard from "./SlabCard";

interface ProductGridProps {
  slabs: Slab[];
}

export default function ProductGrid({ slabs }: ProductGridProps) {
  if (slabs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <span className="material-symbols-outlined text-[48px] text-on-surface-variant mb-4">
          search_off
        </span>
        <p className="text-on-surface text-lg font-headline font-semibold mb-2">
          No slabs found
        </p>
        <p className="text-on-surface-variant text-sm">
          Try adjusting your filters to see more results.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {slabs.map((slab) => (
        <SlabCard key={slab.PRODUCT_CODE} slab={slab} />
      ))}
    </div>
  );
}
