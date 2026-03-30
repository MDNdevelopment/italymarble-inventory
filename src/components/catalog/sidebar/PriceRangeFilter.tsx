interface PriceRangeFilterProps {
  bounds: [number, number];
  range: [number, number];
  onChange: (range: [number, number]) => void;
}

export default function PriceRangeFilter({
  bounds,
  range,
  onChange,
}: PriceRangeFilterProps) {
  const [min, max] = bounds;
  const leftPct = ((range[0] - min) / (max - min)) * 100;
  const rightPct = ((range[1] - min) / (max - min)) * 100;

  return (
    <div>
      <h4 className="text-onprimary text-[10px] font-semibold tracking-[0.18em] uppercase mb-3">
        Price Range
      </h4>

      {/* Visual track with overlaid range inputs */}
      <div className="relative h-1 bg-outline-variant rounded-full my-4">
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-primary border-2 border-on-primary rounded-full -translate-y-1/2 top-1/2 -translate-x-1/2 shadow"
          style={{ left: `${leftPct}%` }}
        />
        <div
          className="absolute w-4 h-4 bg-primary border-2 border-on-primary rounded-full -translate-y-1/2 top-1/2  -translate-x-1/2 shadow"
          style={{ left: `${rightPct}%` }}
        />

        {/* Min slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={range[0]}
          onChange={(e) => {
            const newMin = Math.min(Number(e.target.value), range[1]);
            onChange([newMin, range[1]]);
          }}
          className="absolute inset-0 w-full opacity-0  cursor-pointer h-full pointer-events-none appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
        />
        {/* Max slider */}
        <input
          type="range"
          min={min}
          max={max}
          value={range[1]}
          onChange={(e) => {
            const newMax = Math.max(Number(e.target.value), range[0]);
            onChange([range[0], newMax]);
          }}
          className="absolute inset-0 w-full opacity-0  cursor-pointer pointer-events-none h-full  appearance-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto"
        />
      </div>

      <div className="flex justify-between mt-3">
        <span className="text-xs text-on-surface-variant">
          €{range[0]}
          <span className="text-[10px]">/sqm</span>
        </span>
        <span className="text-xs text-on-surface-variant">
          €{range[1]}
          <span className="text-[10px]">/sqm</span>
        </span>
      </div>
    </div>
  );
}
