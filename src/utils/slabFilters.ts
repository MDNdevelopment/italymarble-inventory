import { Slab } from "./types";

export function getSlabColor(slab: Slab): string {
  return slab.ind_tag;
}

export function getBadge(slab: Slab): "reserved" | "new" | null {
  if (slab.quantity === 1) return "reserved";
  if (slab.id <= 3) return "new";
  return null;
}

export function formatDimensions(length: number, width: number): string {
  return `${length} × ${width} cm`;
}

export function getMaterialCounts(slabs: Slab[]): Record<string, number> {
  return slabs.reduce<Record<string, number>>((acc, slab) => {
    acc[slab.material_index] = (acc[slab.material_index] ?? 0) + 1;
    return acc;
  }, {});
}
