import { FilterState } from "@/utils/types";
import { getMaterialCounts } from "@/utils/slabFilters";
import { mockSlabs } from "@/utils/mockData";
import ColorFilter from "./ColorFilter";
import MaterialFilter from "./MaterialFilter";
import FinishFilter from "./FinishFilter";
import PriceRangeFilter from "./PriceRangeFilter";

interface SidebarProps {
  filters: FilterState;
  onToggleColor: (color: string) => void;
  onToggleMaterial: (material: string) => void;
  onToggleFinish: (finish: string) => void;
  onReset: () => void;
}

const materialCounts = getMaterialCounts(mockSlabs);

export default function Sidebar({
  filters,
  onToggleColor,
  onToggleMaterial,
  onToggleFinish,
  onReset,
}: SidebarProps) {
  const hasActiveFilters =
    filters.colors.length > 0 ||
    filters.materials.length > 0 ||
    filters.finishes.length > 0;

  return (
    <aside className="w-64 shrink-0">
      <div className="sticky top-28">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-on-background text-xs font-semibold tracking-[0.18em] uppercase">
            Refine Search
          </h2>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-primary text-[11px] hover:underline flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
              Clear
            </button>
          )}
        </div>

        <div className="space-y-8">
          <ColorFilter selected={filters.colors} onToggle={onToggleColor} />
          <div className="h-px bg-outline-variant" />
          <MaterialFilter
            selected={filters.materials}
            counts={materialCounts}
            onToggle={onToggleMaterial}
          />
          <div className="h-px bg-outline-variant" />
          <FinishFilter selected={filters.finishes} onToggle={onToggleFinish} />
          <div className="h-px bg-outline-variant" />
          <PriceRangeFilter range={filters.priceRange} />
        </div>
      </div>
    </aside>
  );
}
