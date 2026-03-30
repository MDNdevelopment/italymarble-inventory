import { useState } from "react";
import { useCart } from "@/hooks/useCart";
import { Slab } from "@/utils/types";

interface CustomerFields {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export function useQuoteSubmit(slabs: Slab[], isDirect: boolean) {
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function submit(fields: CustomerFields) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: fields, slabs }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      if (!isDirect) clearCart();
      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { submit, loading, error, success };
}
