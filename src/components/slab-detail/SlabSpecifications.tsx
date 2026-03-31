import { Slab } from "@/utils/types";
import { formatDimensions } from "@/utils/slabFilters";

interface SlabSpecificationsProps {
  slab: Slab;
}

const specRows: { label: string; getValue: (slab: Slab) => string }[] = [
  { label: "Dimensions", getValue: (s) => formatDimensions(s.length, s.width) },
  { label: "Material", getValue: (s) => s.material_index },
  { label: "Finish", getValue: (s) => s.surface_index },
];

export default function SlabSpecifications({ slab }: SlabSpecificationsProps) {
  return (
    <div className="bg-surface-variant p-10">
      <h2 className="text-lg tracking-[0.25em] uppercase text-on-surface mb-8 border-b border-outline pb-2">
        Specifications
      </h2>
      <div className="flex flex-col gap-6">
        {specRows.map(({ label, getValue }) => (
          <div
            key={label}
            className="flex justify-between items-baseline gap-4"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-on-surface-variant">
              {label}
            </span>
            <span className="text-sm text-on-surface text-right">
              {getValue(slab)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
