"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useCheckoutSlabs } from "@/hooks/useCheckoutSlabs";
import { useQuoteSubmit } from "@/hooks/useQuoteSubmit";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const directCode = searchParams.get("direct");
  const isDirect = !!directCode;

  const { slabs, loading, error: loadError } = useCheckoutSlabs(directCode);
  const {
    submit,
    loading: submitting,
    error: submitError,
    success,
  } = useQuoteSubmit(slabs, isDirect);

  if (loading) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-[1920px] mx-auto">
        <div className="h-8 w-64 bg-surface-variant animate-pulse rounded-sm mb-8" />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 h-96 bg-surface-variant animate-pulse rounded-sm" />
          <div className="w-full lg:w-80 h-64 bg-surface-variant animate-pulse rounded-sm" />
        </div>
      </main>
    );
  }

  if (loadError) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-[1920px] mx-auto flex flex-col items-center justify-center gap-4 text-center">
        <span className="material-symbols-outlined text-5xl text-error">
          error
        </span>
        <p className="text-on-surface">{loadError}</p>
        <Link href="/" className="text-primary underline text-sm">
          Back to catalog
        </Link>
      </main>
    );
  }

  if (success) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-360 mx-auto flex flex-col items-center justify-center gap-6 text-center">
        <span className="material-symbols-outlined text-6xl text-primary">
          check_circle
        </span>
        <div>
          <h1 className="text-3xl font-bold font-headline text-on-background mb-2">
            Quote Request Submitted
          </h1>
          <p className="text-on-surface-variant max-w-sm">
            We&apos;ll get back to you within 24 hours with pricing and
            availability.
          </p>
        </div>
        <Link
          href="/"
          className="mt-2 bg-primary text-on-primary text-xs tracking-[0.2em] uppercase font-semibold py-4 px-8 hover:opacity-90 transition-opacity"
        >
          Back to Catalog
        </Link>
      </main>
    );
  }

  if (slabs.length === 0) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-[1920px] mx-auto flex flex-col items-center justify-center gap-4 text-center">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant">
          shopping_cart
        </span>
        <p className="text-on-surface text-lg">No slabs selected.</p>
        <Link href="/" className="text-primary underline text-sm">
          Browse the catalog
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 md:px-12 max-w-360 mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline text-on-background mb-1">
          Request a Quote
        </h1>
        <p className="text-on-surface-variant text-sm">
          Fill in your details and we will get back to you with pricing.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">
          <CheckoutForm
            onSubmit={submit}
            loading={submitting}
            error={submitError}
          />
        </div>
        <div className="w-full lg:w-80 lg:sticky lg:top-24">
          <OrderSummary slabs={slabs} />
        </div>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense>
      <CheckoutContent />
    </Suspense>
  );
}
