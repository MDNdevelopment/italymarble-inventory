export interface SlabRow {
  product_code: string;
  material_index?: string;
  surface_index?: string;
  thickness?: number;
  ind_tag?: string;
  lot_no?: string;
  quality?: string;
  location?: string;
  bin_location?: string;
  length?: number;
  width?: number;
  length_net?: number;
  width_net?: number;
  quantity?: number;
  unit?: string;
  inspection?: boolean;
  inactive?: boolean;
  picture_ref?: string;
  picture_s_ref?: string;
  bookmatch?: string;
  value?: number;
  surface_area?: number;
  contour_file?: string;
}

export interface Slab {
  id: number;
  product_code: string;
  material_index: string;
  surface_index: string;
  thickness: number;
  ind_tag: string;
  quality: string;
  length: number;
  width: number;
  length_net: number;
  width_net: number;
  quantity: number;
  unit: string;
  inactive: boolean;
  picture_ref: string;
  picture_s_ref: string;
  surface_area: number;
  contour_file: string;
}

export interface FilterState {
  colors: string[];
  materials: string[];
  finishes: string[];
  priceRange: [number, number];
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  pageSize: number;
}
