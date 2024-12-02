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
      const recursiveRemove = (items: INavigationItem[]): INavigationItem[] =>
        items
          .filter((item) => item.id !== action.payload)
          .map((item) => ({
            ...item,
            children: item.children ? recursiveRemove(item.children) : [],
          }));

      state.navigationItems = recursiveRemove(state.navigationItems);
    },
    EDIT_ITEM: (
      state,
      action: PayloadAction<{
        id: string;
        updatedItem: Partial<INavigationItem>;
      }>
    ) => {
      const recursiveUpdate = (items: INavigationItem[]): INavigationItem[] =>
        items.map((item) =>
          item.id === action.payload.id
            ? { ...item, ...action.payload.updatedItem }
            : {
                ...item,
                children: item.children
                  ? recursiveUpdate(item.children)
                  : undefined,
              }
        );

      state.navigationItems = recursiveUpdate(state.navigationItems);
    },
    REORDER_ITEMS: (
      state,
      action: PayloadAction<{ items: INavigationItem[]; parentId?: string }>
    ) => {
      const { items, parentId } = action.payload;

      if (parentId) {
        const recursiveReorder = (
          navigationItems: INavigationItem[]
        ): INavigationItem[] =>
          navigationItems.map((item) =>
            item.id === parentId
              ? {
                  ...item,
                  children: items,
                }
              : {
                  ...item,
                  children: item.children
                    ? recursiveReorder(item.children)
                    : undefined,
                }
          );

        state.navigationItems = recursiveReorder(state.navigationItems);
      } else {
        state.navigationItems = items;
      }
    },
    ADD_TEMP_ITEM: (state) => {
      state.tempItems.push({
        id: Math.floor(Math.random() * 1000000000).toString(),
        label: "",
        url: "",
        depth: 0,
      });
    },
    REMOVE_TEMP_ITEM: (state, action: PayloadAction<string>) => {
      state.tempItems = state.tempItems.filter(
        (item) => item.id !== action.payload
      );
    },
    ADD_CHILD: (
      state,
      action: PayloadAction<{ parentId: string; child: INavigationItem }>
    ) => {
      const recursiveAddChild = (items: INavigationItem[]): INavigationItem[] =>
        items.map((item) =>
          item.id === action.payload.parentId
            ? {
                ...item,
                children: item.children
                  ? [...item.children, action.payload.child]
                  : [action.payload.child],
              }
            : {
                ...item,
                children: item.children
                  ? recursiveAddChild(item.children)
                  : undefined,
              }
        );

      state.navigationItems = recursiveAddChild(state.navigationItems);
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
  ADD_CHILD,
} = navigationSlice.actions;

export default navigationSlice.reducer;
