interface FinishFilterProps {
  finishes: string[];
  selected: string[];
  onToggle: (finish: string) => void;
}

export default function FinishFilter({
  finishes,
  selected,
  onToggle,
}: FinishFilterProps) {
  return (
    <div>
      <h4 className="text-primary text-[10px] font-semibold tracking-[0.18em] uppercase mb-3">
        Finish
      </h4>
      <div className="flex gap-2 flex-wrap">
        {finishes.map((finish) => {
          const isSelected = selected.includes(finish);
          return (
            <button
              key={finish}
              onClick={() => onToggle(finish)}
              className={`flex items-center gap-1.5 px-3 py-1.5  text-xs border transition-all duration-200 uppercase tracking-wide ${
                isSelected
                  ? "bg-primary/20 border-primary text-primary"
                  : "border-outline-variant text-primary hover:border-outline hover:text-on-surface"
              }`}
            >
              {finish}
            </button>
          );
        })}
      </div>
    </div>
  );
}
