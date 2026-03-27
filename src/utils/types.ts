export interface Slab {
  INDEX: number;
  PRODUCT_CODE: string;
  MATERIAL_INDEX: string;
  SURFACE_INDEX: string;
  THICKNESS: number;
  TAG_NO: string;
  LOT_NO: string;
  QUALITY: string;
  LOCATION: string;
  BIN_LOCATION: string;
  LENGTH: number;
  WIDTH: number;
  LENGTH_NET: number;
  WIDTH_NET: number;
  QUANTITY: number;
  UNIT: string;
  INSPECTION: boolean;
  INACTIVE: boolean;
  PICTURE_REF: string;
  PICTURE_S_REF: string;
  BOOKMATCH: string;
  VALUE: number;
  SURFACE_AREA: number;
  CONTOUR_FILE: string;
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
