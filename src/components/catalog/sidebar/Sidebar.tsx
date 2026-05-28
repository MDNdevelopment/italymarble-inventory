import { FilterState } from "@/utils/types";
import ColorFilter from "./ColorFilter";
import MaterialFilter from "./MaterialFilter";
import FinishFilter from "./FinishFilter";

interface SidebarProps {
  availableColors: string[];
  availableMaterials: string[];
  availableFinishes: string[];
  materialCounts: Record<string, number>;
  filters: FilterState;
  onToggleColor: (color: string) => void;
  onToggleMaterial: (material: string) => void;
  onToggleFinish: (finish: string) => void;
  onReset: () => void;
  variant?: "desktop" | "mobile";
}

export default function Sidebar({
  availableColors,
  availableMaterials,
  availableFinishes,
  materialCounts,
  filters,
  onToggleColor,
  onToggleMaterial,
  onToggleFinish,
  onReset,
  variant = "desktop",
}: SidebarProps) {
  const hasActiveFilters =
    filters.colors.length > 0 ||
    filters.materials.length > 0 ||
    filters.finishes.length > 0;

  const isDesktop = variant === "desktop";

  return (
    <aside className={isDesktop ? "w-64 shrink-0" : "w-full"}>
      <div className={isDesktop ? "sticky top-28" : undefined}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-on-background text-xs font-semibold tracking-[0.18em] uppercase">
            Refine Search
          </h2>
          {hasActiveFilters && (
            <button
              onClick={onReset}
              className="text-primary text-[11px] cursor-pointer flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[14px]">
                close
              </span>
              Clear
            </button>
          )}
        </div>

        <div className="space-y-8">
          <ColorFilter
            colors={availableColors}
            selected={filters.colors}
            onToggle={onToggleColor}
          />
          <div className="h-px bg-outline-variant" />
          <MaterialFilter
            materials={availableMaterials}
            selected={filters.materials}
            counts={materialCounts}
            onToggle={onToggleMaterial}
          />
          <div className="h-px bg-outline-variant" />
          <FinishFilter
            finishes={availableFinishes}
            selected={filters.finishes}
            onToggle={onToggleFinish}
          />
        </div>
      </div>
    </aside>
  );
}
