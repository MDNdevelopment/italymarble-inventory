import { useReducer } from "react";
import { FilterState } from "@/utils/types";

type Action =
  | { type: "TOGGLE_COLOR"; color: string }
  | { type: "TOGGLE_MATERIAL"; material: string }
  | { type: "TOGGLE_FINISH"; finish: string }
  | { type: "RESET" };

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
    case "RESET":
      return { colors: [], materials: [], finishes: [] };
    default:
      return state;
  }
}

export function useFilters() {
  const [filters, dispatch] = useReducer(filtersReducer, {
    colors: [],
    materials: [],
    finishes: [],
  });

  const toggleColor = (color: string) => dispatch({ type: "TOGGLE_COLOR", color });
  const toggleMaterial = (material: string) => dispatch({ type: "TOGGLE_MATERIAL", material });
  const toggleFinish = (finish: string) => dispatch({ type: "TOGGLE_FINISH", finish });
  const reset = () => dispatch({ type: "RESET" });

  return { filters, toggleColor, toggleMaterial, toggleFinish, reset };
}
