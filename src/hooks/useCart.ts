import { useContext } from "react";
import { CartContext, CartContextValue } from "@/utils/cartContext";

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within <CartProvider>");
  return ctx;
}
