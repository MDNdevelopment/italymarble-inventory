import { AVAILABLE_COLORS } from "@/utils/mockData";

interface ColorFilterProps {
  selected: string[];
  onToggle: (color: string) => void;
}

const colorSwatches: Record<string, string> = {
  White: "bg-stone-100",
  Black: "bg-stone-950 border-stone-700",
  Gray: "bg-stone-500",
  Blue: "bg-blue-800",
  Green: "bg-emerald-800",
};

export default function ColorFilter({ selected, onToggle }: ColorFilterProps) {
  return (
    <div>
      <h4 className="text-on-surface-variant text-[10px] font-semibold tracking-[0.18em] uppercase mb-3">
        Color
      </h4>
      <div className="flex flex-wrap gap-2">
        {AVAILABLE_COLORS.map((color) => {
          const isSelected = selected.includes(color);
          return (
            <button
              key={color}
              onClick={() => onToggle(color)}
              title={color}
              className={`relative flex flex-col items-center gap-1.5 group`}
            >
              <span
                className={`w-8 h-8 rounded border-2 transition-all duration-200 ${colorSwatches[color] ?? "bg-stone-400"} ${
                  isSelected
                    ? "border-primary scale-110 shadow-[0_0_0_1px_var(--md-primary)]"
                    : "border-outline-variant hover:border-outline"
                }`}
              />
              <span
                className={`text-[9px] tracking-wider ${
                  isSelected ? "text-primary" : "text-on-surface-variant"
                }`}
              >
                {color.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
