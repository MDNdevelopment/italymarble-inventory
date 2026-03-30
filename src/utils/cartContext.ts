import { createContext } from "react";
import { Slab } from "@/utils/types";

export interface CartItem {
  slab: Slab;
  addedAt: number;
}

export interface CartContextValue {
  items: CartItem[];
  addItem: (slab: Slab) => void;
  removeItem: (slabId: number) => void;
  clearCart: () => void;
  isInCart: (slabId: number) => boolean;
  itemCount: number;
  mounted: boolean;
}

export const CartContext = createContext<CartContextValue | null>(null);
