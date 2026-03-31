import { useState, useEffect } from "react";
import { useCart } from "@/hooks/useCart";
import { Slab } from "@/utils/types";
import { createClient } from "@/utils/supabase/client";

export function useCheckoutSlabs(directProductCode: string | null) {
  const { items } = useCart();
  const [slabs, setSlabs] = useState<Slab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!directProductCode) {
      setSlabs(items.map((i) => i.slab));
      setLoading(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("slabs")
      .select("*")
      .eq("product_code", directProductCode)
      .single()
      .then(({ data, error: err }) => {
        if (err || !data) {
          setError("Slab not found.");
        } else {
          setSlabs([data as Slab]);
        }
        setLoading(false);
      });
  }, [directProductCode, items]);

  return { slabs, loading, error };
}
