"use client";

import Image from "next/image";
import { CartItem } from "@/utils/cartContext";
import { useCart } from "@/hooks/useCart";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { removeItem } = useCart();
  const { slab } = item;

  return (
    <div className="flex gap-4 p-4 bg-surface border border-outline-variant rounded-sm">
      <div className="relative w-24 h-24 shrink-0 bg-surface-variant overflow-hidden rounded-sm">
        {slab.picture_s_ref ? (
          <Image
            src={slab.picture_s_ref}
            alt={slab.product_code}
            fill
            className="object-cover"
            sizes="96px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="material-symbols-outlined text-on-surface-variant">
              image_not_supported
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between flex-1 min-w-0">
        <div>
          <p className="text-xs tracking-[0.15em] uppercase text-on-surface-variant font-semibold">
            {slab.product_code}
          </p>
          <p className="text-on-surface font-medium mt-0.5 truncate">
            {slab.material_index}
          </p>
          <p className="text-on-surface-variant text-sm mt-0.5">
            {slab.surface_index} · {slab.thickness}cm
          </p>
        </div>
        <p className="text-on-surface-variant text-xs mt-1">
          {slab.length} × {slab.width} cm
        </p>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={() => removeItem(slab.id)}
          className="text-on-surface-variant hover:text-error transition-colors"
          aria-label="Remove item"
        >
          <span className="material-symbols-outlined text-[20px]">delete</span>
        </button>
      </div>
    </div>
  );
}
