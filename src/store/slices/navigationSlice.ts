import { INavigationItem } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  navigationItems: INavigationItem[];
  tempItems: INavigationItem[];
}

const initialState: NavigationState = {
  navigationItems: [],
  tempItems: [],
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    ADD_ITEM: (state, action: PayloadAction<INavigationItem>) => {
      state.navigationItems.push(action.payload);
    },
    REMOVE_ITEM: (state, action: PayloadAction<string>) => {
      state.navigationItems = state.navigationItems.filter(
        (item) => item.id !== action.payload
      );
    },
    EDIT_ITEM: (
      state,
      action: PayloadAction<{
        id: string;
        updatedItem: Partial<INavigationItem>;
      }>
    ) => {
      state.navigationItems = state.navigationItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updatedItem }
          : item
      );
    },
    REORDER_ITEMS: (state, action: PayloadAction<INavigationItem[]>) => {
      state.navigationItems = action.payload;
    },
    ADD_TEMP_ITEM: (state, action: PayloadAction<INavigationItem>) => {
      state.tempItems.push(action.payload);
    },
    REMOVE_TEMP_ITEM: (state, action: PayloadAction<string>) => {
      state.tempItems = state.tempItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  ADD_ITEM,
  REMOVE_ITEM,
  EDIT_ITEM,
  REORDER_ITEMS,
  ADD_TEMP_ITEM,
  REMOVE_TEMP_ITEM,
} = navigationSlice.actions;

export default navigationSlice.reducer;
