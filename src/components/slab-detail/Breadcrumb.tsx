import Link from "next/link";

interface BreadcrumbProps {
  productCode: string;
}

export default function Breadcrumb({ productCode }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-3 text-xs font-label tracking-widest uppercase text-outline mb-8">
      <Link
        href="/"
        className="flex items-center gap-1 text-on-surface-variant hover:text-on-surface transition-colors"
        aria-label="Back to catalog"
      >
        <span className="material-symbols-outlined text-base leading-none">
          arrow_back
        </span>
      </Link>
      <Link
        href="/"
        className="hover:text-on-surface-variant transition-colors text-on-surface"
      >
        Home
      </Link>
      <span>/</span>
      <Link href="/catalog" className="text-on-surface transition-colors">
        Catalog
      </Link>
      <span>/</span>
      <span className="text-primary">{productCode}</span>
    </nav>
  );
}
