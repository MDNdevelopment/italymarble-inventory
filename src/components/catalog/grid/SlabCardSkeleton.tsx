export default function SlabCardSkeleton() {
  return (
    <article className="bg-surface overflow-hidden border border-outline-variant animate-pulse">
      {/* Image placeholder */}
      <div className="relative w-full aspect-[5/6] bg-surface-variant" />

      {/* Card body */}
      <div className="p-4">
        <div className="mb-4">
          <div className="h-2.5 w-2/3 bg-surface-variant rounded" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-2.5 w-16 bg-surface-variant rounded" />
            <div className="h-2.5 w-10 bg-surface-variant rounded" />
          </div>
          <div className="h-4 w-12 bg-surface-variant rounded" />
        </div>
      </div>
    </article>
  );
}
