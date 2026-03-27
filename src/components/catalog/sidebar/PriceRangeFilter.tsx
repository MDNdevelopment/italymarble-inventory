import { PRICE_RANGE } from "@/utils/mockData";

interface PriceRangeFilterProps {
  range: [number, number];
}

export default function PriceRangeFilter({ range }: PriceRangeFilterProps) {
  const [min, max] = PRICE_RANGE;
  const leftPct = ((range[0] - min) / (max - min)) * 100;
  const rightPct = ((range[1] - min) / (max - min)) * 100;

  return (
    <div>
      <h4 className="text-on-surface-variant text-[10px] font-semibold tracking-[0.18em] uppercase mb-3">
        Price Range
      </h4>

      {/* Visual track */}
      <div className="relative h-1 bg-outline-variant rounded-full my-4">
        <div
          className="absolute h-full bg-primary rounded-full"
          style={{ left: `${leftPct}%`, right: `${100 - rightPct}%` }}
        />
        <div
          className="absolute w-3.5 h-3.5 bg-primary border-2 border-on-primary rounded-full -top-[5px] -translate-x-1/2 shadow"
          style={{ left: `${leftPct}%` }}
        />
        <div
          className="absolute w-3.5 h-3.5 bg-primary border-2 border-on-primary rounded-full -top-[5px] -translate-x-1/2 shadow"
          style={{ left: `${rightPct}%` }}
        />
      </div>

      <div className="flex justify-between mt-3">
        <span className="text-xs text-on-surface-variant">
          €{range[0]}<span className="text-[10px]">/sqm</span>
        </span>
        <span className="text-xs text-on-surface-variant">
          €{range[1]}<span className="text-[10px]">/sqm</span>
        </span>
      </div>
    </div>
  );
}
