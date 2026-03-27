import { Slab, FilterState } from "./types";
import { slabNames } from "./mockData";

export function getSlabName(slab: Slab): string {
  return slabNames[slab.PRODUCT_CODE] ?? slab.PRODUCT_CODE;
}

export function getSlabColor(slab: Slab): string {
  return slab.TAG_NO;
}

export function getBadge(slab: Slab): "reserved" | "new" | null {
  if (slab.QUANTITY === 1) return "reserved";
  if (slab.INDEX <= 3) return "new";
  return null;
}

export function filterSlabs(slabs: Slab[], filters: FilterState): Slab[] {
  return slabs.filter((slab) => {
    if (filters.colors.length > 0 && !filters.colors.includes(getSlabColor(slab))) {
      return false;
    }
    if (filters.materials.length > 0 && !filters.materials.includes(slab.MATERIAL_INDEX)) {
      return false;
    }
    if (filters.finishes.length > 0 && !filters.finishes.includes(slab.SURFACE_INDEX)) {
      return false;
    }
    if (slab.VALUE < filters.priceRange[0] || slab.VALUE > filters.priceRange[1]) {
      return false;
    }
    return true;
  });
}

export function paginateSlabs(slabs: Slab[], page: number, pageSize: number): Slab[] {
  const start = (page - 1) * pageSize;
  return slabs.slice(start, start + pageSize);
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function formatDimensions(length: number, width: number): string {
  return `${length} × ${width} cm`;
}

export function getMaterialCounts(slabs: Slab[]): Record<string, number> {
  return slabs.reduce<Record<string, number>>((acc, slab) => {
    acc[slab.MATERIAL_INDEX] = (acc[slab.MATERIAL_INDEX] ?? 0) + 1;
    return acc;
  }, {});
}
