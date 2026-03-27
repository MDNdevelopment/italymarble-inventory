interface SlabBadgeProps {
  type: "reserved" | "new";
}

const badgeConfig = {
  reserved: {
    label: "Reserved",
    className: "bg-error/20 text-error border border-error/30",
  },
  new: {
    label: "New Arrival",
    className: "bg-primary/20 text-primary border border-primary/30",
  },
};

export default function SlabBadge({ type }: SlabBadgeProps) {
  const { label, className } = badgeConfig[type];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded text-[10px] font-semibold tracking-[0.12em] uppercase ${className}`}
    >
      {label}
    </span>
  );
}
