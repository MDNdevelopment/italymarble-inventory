import Image from "next/image";
import { Slab } from "@/utils/types";
import { getSlabName, getBadge, formatDimensions } from "@/utils/slabFilters";
import SlabBadge from "./SlabBadge";

interface SlabCardProps {
  slab: Slab;
}

export default function SlabCard({ slab }: SlabCardProps) {
  const name = getSlabName(slab);
  const badge = getBadge(slab);
  const dimensions = formatDimensions(slab.LENGTH, slab.WIDTH);

  return (
    <article className="group relative bg-surface  overflow-hidden border border-outline-variant hover:border-outline transition-colors duration-300 cursor-pointer">
      {/* Image container */}
      <div className="relative w-full aspect-[5/6] overflow-hidden bg-surface-variant">
        <Image
          src={slab.PICTURE_REF}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-1 group-hover:translate-y-0 transition-transform duration-300"></div>
      </div>

      {/* Card body */}
      <div className="p-4">
        <div className="mb-4">
          <div className="text-white/50 text-[10px] tracking-[0.2em] uppercase mb-1">
            {slab.MATERIAL_INDEX} · {slab.SURFACE_INDEX}
          </div>
          <h3 className="text-white font-headline font-semibold text-lg leading-tight">
            {name}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-on-surface-variant text-xs">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">
                straighten
              </span>
              {dimensions}
            </span>
            <span className="w-px h-3 bg-outline-variant" />
            <span>{slab.THICKNESS}mm</span>
          </div>
          <div className="text-right">
            <span className="text-primary font-semibold text-sm">
              €{slab.VALUE}
            </span>
            <span className="text-on-surface-variant text-[10px]">/sqm</span>
          </div>
        </div>
      </div>
    </article>
  );
}
