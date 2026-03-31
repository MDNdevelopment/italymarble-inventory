import Link from "next/link";

export default function NotFound() {
  return (
    <main className="pt-32 pb-24 px-6 md:px-12 max-w-[1920px] mx-auto min-h-screen">
      <p className="text-[10px] tracking-[0.25em] uppercase text-outline mb-4">
        404
      </p>
      <h1 className="font-headline text-4xl font-bold uppercase tracking-widest text-on-background mb-6">
        Slab Not Found
      </h1>
      <p className="text-on-surface-variant text-sm mb-10">
        The slab you are looking for does not exist or is no longer available.
      </p>
      <Link
        href="/"
        className="text-xs tracking-[0.2em] uppercase border border-outline text-on-surface-variant hover:border-primary hover:text-primary transition-colors py-3 px-6"
      >
        Back to Catalog
      </Link>
    </main>
  );
}
