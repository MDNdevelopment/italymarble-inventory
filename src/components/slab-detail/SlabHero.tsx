import { Slab } from "@/utils/types";

interface SlabHeroProps {
  slab: Slab;
}

export default function SlabHero({ slab }: SlabHeroProps) {
  return (
    <div className="pb-10 mb-10 border-b border-outline-variant">
      <h1 className="font-headline text-3xl md:text-5xl font-black uppercase tracking-wide text-on-background mb-3">
        {slab.product_code}
      </h1>
      <p className="text-sm text-on-surface-variant mb-4">
        {slab.material_index} · {slab.surface_index} stone slab.
      </p>
    </div>
  );
}
