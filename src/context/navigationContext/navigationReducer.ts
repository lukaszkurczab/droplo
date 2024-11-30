import { INavigationItem } from "@/types/types";

export interface NavigationState {
  navigationItems: INavigationItem[];
}

export type NavigationAction =
  | { type: "ADD_ITEM"; payload: INavigationItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | {
      type: "EDIT_ITEM";
      payload: { id: string; updatedItem: Partial<INavigationItem> };
    }
  | { type: "REORDER_ITEMS"; payload: INavigationItem[] };

export const initialState: NavigationState = {
  navigationItems: [],
};

export const navigationReducer = (
  state: NavigationState,
  action: NavigationAction
): NavigationState => {
  switch (action.type) {
    case "ADD_ITEM":
      return {
        ...state,
        navigationItems: [...state.navigationItems, action.payload],
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        navigationItems: state.navigationItems.filter(
          (item) => item.id !== action.payload
        ),
      };

    case "EDIT_ITEM":
      return {
        ...state,
        navigationItems: state.navigationItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updatedItem }
            : item
        ),
      };

    case "REORDER_ITEMS":
      return {
        ...state,
        navigationItems: action.payload, // payload to nowa posortowana lista
      };

    default:
      throw new Error(`Unknown action type: ${(action as any).type}`);
  }
};
