import { AVAILABLE_FINISHES } from "@/utils/mockData";

interface FinishFilterProps {
  selected: string[];
  onToggle: (finish: string) => void;
}

const finishIcons: Record<string, string> = {
  Polished: "brightness_high",
  Honed: "brightness_medium",
  Satin: "brightness_low",
};

export default function FinishFilter({ selected, onToggle }: FinishFilterProps) {
  return (
    <div>
      <h4 className="text-on-surface-variant text-[10px] font-semibold tracking-[0.18em] uppercase mb-3">
        Finish
      </h4>
      <div className="flex gap-2 flex-wrap">
        {AVAILABLE_FINISHES.map((finish) => {
          const isSelected = selected.includes(finish);
          return (
            <button
              key={finish}
              onClick={() => onToggle(finish)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs border transition-all duration-200 ${
                isSelected
                  ? "bg-primary-container border-primary text-primary"
                  : "border-outline-variant text-on-surface-variant hover:border-outline hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[14px]">
                {finishIcons[finish] ?? "texture"}
              </span>
              {finish}
            </button>
          );
        })}
      </div>
    </div>
  );
}
