import Link from "next/link";
import { Slab } from "@/utils/types";
import SlabCard from "../catalog/grid/SlabCard";
interface SimilarSlabsProps {
  slabs: Slab[];
}

export default function SimilarSlabs({ slabs }: SimilarSlabsProps) {
  if (slabs.length === 0) return null;

  return (
    <section className="px-6 md:px-12 mx-auto mt-32">
      <div className="flex items-end justify-between mb-12 pb-6 border-b border-outline-variant">
        <div>
          <p className="text-[10px] tracking-[0.25em] uppercase text-outline mb-2">
            Curated Selection
          </p>
          <h2 className="font-headline text-2xl font-bold uppercase tracking-widest text-on-background">
            Similar Stones
          </h2>
        </div>
        <Link
          href="/"
          className="text-xs tracking-[0.2em] uppercase text-on-surface-variant hover:text-primary transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {slabs.map((slab) => (
          <div key={slab.id} className="bg-background">
            <SlabCard slab={slab} />
          </div>
        ))}
      </div>
    </section>
  );
}
