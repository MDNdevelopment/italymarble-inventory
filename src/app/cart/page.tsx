"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import CartItemCard from "@/components/cart/CartItemCard";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  const { items, mounted } = useCart();

  if (!mounted) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="h-8 w-48 bg-surface-variant animate-pulse rounded-sm mb-8" />
        <div className="flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 bg-surface-variant animate-pulse rounded-sm"
            />
          ))}
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-[1920px] mx-auto flex flex-col items-center justify-center gap-6 text-center">
        <span className="material-symbols-outlined text-6xl text-on-surface-variant">
          shopping_cart
        </span>
        <h1 className="text-2xl font-semibold font-headline text-on-surface">
          Your selection is empty
        </h1>
        <p className="text-on-surface-variant max-w-sm">
          Browse our catalog and add slabs you are interested in to request a
          quote.
        </p>
        <Link
          href="/"
          className="mt-2 bg-primary text-on-primary text-xs tracking-[0.2em] uppercase font-semibold py-4 px-8 hover:opacity-90 transition-opacity"
        >
          Browse Catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-[1920px] mx-auto">
      <h1 className="text-3xl font-bold font-headline text-on-background mb-2">
        Your Selection
      </h1>
      <p className="text-on-surface-variant text-sm mb-8">
        {items.length} {items.length === 1 ? "slab" : "slabs"} selected
      </p>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex flex-col gap-3 flex-1 w-full">
          {items.map((item) => (
            <CartItemCard key={item.slab.id} item={item} />
          ))}
        </div>

        <div className="w-full lg:w-80 lg:sticky lg:top-24">
          <CartSummary />
        </div>
      </div>
    </main>
  );
}
