import { useEffect, useReducer, useRef } from "react";
import { FilterState } from "@/utils/types";

type Action =
  | { type: "TOGGLE_COLOR"; color: string }
  | { type: "TOGGLE_MATERIAL"; material: string }
  | { type: "TOGGLE_FINISH"; finish: string }
  | { type: "SET_PRICE_RANGE"; range: [number, number] }
  | { type: "RESET"; defaultPriceRange: [number, number] };

function toggle(arr: string[], val: string): string[] {
  return arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val];
}

function filtersReducer(state: FilterState, action: Action): FilterState {
  switch (action.type) {
    case "TOGGLE_COLOR":
      return { ...state, colors: toggle(state.colors, action.color) };
    case "TOGGLE_MATERIAL":
      return { ...state, materials: toggle(state.materials, action.material) };
    case "TOGGLE_FINISH":
      return { ...state, finishes: toggle(state.finishes, action.finish) };
    case "SET_PRICE_RANGE":
      return { ...state, priceRange: action.range };
    case "RESET":
      return { colors: [], materials: [], finishes: [], priceRange: action.defaultPriceRange };
    default:
      return state;
  }
}

export function useFilters(defaultPriceRange: [number, number] = [0, 500]) {
  const defaultPriceRangeRef = useRef(defaultPriceRange);

  const [filters, dispatch] = useReducer(filtersReducer, {
    colors: [],
    materials: [],
    finishes: [],
    priceRange: defaultPriceRange,
  });

  useEffect(() => {
    if (
      defaultPriceRange[0] !== defaultPriceRangeRef.current[0] ||
      defaultPriceRange[1] !== defaultPriceRangeRef.current[1]
    ) {
      defaultPriceRangeRef.current = defaultPriceRange;
      dispatch({ type: "SET_PRICE_RANGE", range: defaultPriceRange });
    }
  }, [defaultPriceRange]);

  const toggleColor = (color: string) => dispatch({ type: "TOGGLE_COLOR", color });
  const toggleMaterial = (material: string) => dispatch({ type: "TOGGLE_MATERIAL", material });
  const toggleFinish = (finish: string) => dispatch({ type: "TOGGLE_FINISH", finish });
  const setPriceRange = (range: [number, number]) => dispatch({ type: "SET_PRICE_RANGE", range });
  const reset = () => dispatch({ type: "RESET", defaultPriceRange: defaultPriceRangeRef.current });

  return { filters, toggleColor, toggleMaterial, toggleFinish, setPriceRange, reset };
}
