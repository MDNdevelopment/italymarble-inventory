import { AVAILABLE_MATERIALS } from "@/utils/mockData";

interface MaterialFilterProps {
  selected: string[];
  counts: Record<string, number>;
  onToggle: (material: string) => void;
}

export default function MaterialFilter({ selected, counts, onToggle }: MaterialFilterProps) {
  return (
    <div>
      <h4 className="text-on-surface-variant text-[10px] font-semibold tracking-[0.18em] uppercase mb-3">
        Material
      </h4>
      <ul className="space-y-1">
        {AVAILABLE_MATERIALS.map((material) => {
          const isSelected = selected.includes(material);
          const count = counts[material] ?? 0;
          return (
            <li key={material}>
              <button
                onClick={() => onToggle(material)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-sm text-sm transition-colors duration-150 ${
                  isSelected
                    ? "bg-primary-container text-primary"
                    : "text-on-surface hover:bg-surface-container-high"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-primary border-primary"
                        : "border-outline"
                    }`}
                  >
                    {isSelected && (
                      <span className="material-symbols-outlined text-[10px] text-on-primary">
                        check
                      </span>
                    )}
                  </span>
                  {material}
                </span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded ${
                    isSelected
                      ? "bg-primary/20 text-primary"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  {count}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
