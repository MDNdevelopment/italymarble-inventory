"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function CartSummary() {
  const { itemCount } = useCart();

  return (
    <div className="bg-surface border border-outline-variant p-6 flex flex-col gap-4">
      <h2 className="text-xs tracking-[0.2em] uppercase font-semibold text-on-surface-variant">
        Selection Summary
      </h2>

      <div className="flex justify-between items-center py-3 border-y border-outline-variant">
        <span className="text-on-surface-variant text-sm">Selected slabs</span>
        <span className="text-on-surface font-semibold">{itemCount}</span>
      </div>

      <Link
        href="/checkout"
        className="w-full bg-primary text-on-primary text-xs tracking-[0.2em] uppercase font-semibold py-4 px-6 hover:opacity-90 transition-opacity text-center block"
      >
        Request a Quote
      </Link>

      <Link
        href="/"
        className="w-full border border-outline text-on-surface-variant text-xs tracking-[0.2em] uppercase font-semibold py-4 px-6 hover:border-primary hover:text-primary transition-colors text-center block"
      >
        Continue Browsing
      </Link>
    </div>
  );
}
