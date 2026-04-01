"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/hooks/useCart";
import { Slab } from "@/utils/types";

interface SlabActionsProps {
  slab: Slab;
}

export default function SlabActions({ slab }: SlabActionsProps) {
  const router = useRouter();
  const { addItem, isInCart } = useCart();
  const inCart = isInCart(slab.id);

  return (
    <div className="flex flex-col gap-3 mt-6">
      <button
        onClick={() => {
          if (!inCart) addItem(slab);
          router.push("/checkout");
        }}
        className="w-full bg-primary text-on-primary text-xs tracking-[0.2em] uppercase font-semibold py-4 px-6 hover:opacity-90 transition-opacity"
      >
        Request a Quote
      </button>
      <button
        onClick={() => !inCart && addItem(slab)}
        className={`w-full border text-xs tracking-[0.2em] uppercase font-semibold py-4 px-6 transition-colors flex items-center justify-center gap-2 ${
          inCart
            ? "border-primary text-primary cursor-default"
            : "border-outline text-on-surface-variant hover:border-primary hover:text-primary"
        }`}
      >
        {inCart ? (
          <>
            <span className="material-symbols-outlined text-sm">check</span>
            Added to Cart
          </>
        ) : (
          "Add to Cart"
        )}
      </button>
    </div>
  );
}
