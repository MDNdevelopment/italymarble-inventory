"use client";

import { useCallback } from "react";
import { CartContext, CartItem } from "@/utils/cartContext";
import { useCartStorage } from "@/hooks/useCartStorage";
import { Slab } from "@/utils/types";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const { items, setItems, mounted } = useCartStorage();

  const addItem = useCallback((slab: Slab) => {
    setItems((prev) => {
      if (prev.some((i) => i.slab.id === slab.id)) return prev;
      return [...prev, { slab, addedAt: Date.now() }];
    });
  }, [setItems]);

  const removeItem = useCallback((slabId: number) => {
    setItems((prev) => prev.filter((i) => i.slab.id !== slabId));
  }, [setItems]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, [setItems]);

  const isInCart = useCallback(
    (slabId: number) => items.some((i) => i.slab.id === slabId),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, isInCart, itemCount: items.length, mounted }}
    >
      {children}
    </CartContext.Provider>
  );
}
