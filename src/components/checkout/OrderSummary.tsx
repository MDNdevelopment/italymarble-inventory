import Image from "next/image";
import { Slab } from "@/utils/types";

interface OrderSummaryProps {
  slabs: Slab[];
}

export default function OrderSummary({ slabs }: OrderSummaryProps) {
  return (
    <div className="bg-surface border border-outline-variant p-6">
      <h2 className="text-xs tracking-[0.2em] uppercase font-semibold text-on-surface-variant mb-4">
        Order Summary
      </h2>

      <div className="flex flex-col gap-3">
        {slabs.map((slab) => (
          <div key={slab.id} className="flex gap-3 items-center">
            <div className="relative w-14 h-14 shrink-0 bg-surface-variant overflow-hidden rounded-sm">
              {slab.picture_s_ref ? (
                <Image
                  src={slab.picture_s_ref}
                  alt={slab.product_code}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">image_not_supported</span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs tracking-[0.12em] uppercase text-on-surface-variant font-semibold">
                {slab.product_code}
              </p>
              <p className="text-on-surface text-sm truncate">{slab.material_index}</p>
              <p className="text-on-surface-variant text-xs">
                {slab.surface_index} · {slab.length} × {slab.width} cm
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center">
        <span className="text-on-surface-variant text-sm">Total slabs</span>
        <span className="text-on-surface font-semibold">{slabs.length}</span>
      </div>
    </div>
  );
}
