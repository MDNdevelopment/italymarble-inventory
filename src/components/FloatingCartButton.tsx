"use client";

import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function FloatingCartButton() {
  const { itemCount, mounted } = useCart();

  return (
    <Link
      href="/cart"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-white shadow-lg flex items-center justify-center text-gray-900 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200"
    >
      <span className="material-symbols-outlined">shopping_cart</span>
      {mounted && itemCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary text-on-primary text-[10px] font-bold flex items-center justify-center leading-none">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      )}
    </Link>
  );
}
