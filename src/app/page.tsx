"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch, Provider } from "react-redux";
import EmptyMenu from "@/feature/EmptyMenu";
import NavigationList from "@/feature/NavigationList";
import Button from "@/components/Button";
import NavigationForm from "@/feature/NavigationForm";
import { createStore } from "@/store/store";
import { RootState, AppDispatch } from "@/store/store";
import { ADD_TEMP_ITEM } from "@/store/slices/navigationSlice";
import { INavigationItem } from "@/types/types";

const store = createStore();

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigationItems, tempItems } = useSelector(
    (state: RootState) => state.navigation
  );

  const handleAddTempItem = () => {
    const tempItem: INavigationItem = {
      id: Math.floor(Math.random() * 1000000000).toString(),
      label: "",
      url: "",
    };

    dispatch(ADD_TEMP_ITEM(tempItem));
  };

  useEffect(() => {
    console.log(tempItems);
  }, [tempItems]);

  return (
    <div className="m-5 border border-border-border_primary rounded-md overflow-hidden">
      {navigationItems.length ? (
        <>
          <NavigationList items={navigationItems} />
          {tempItems.length > 0 && (
            <div className="bg-background-bg_primary py-5 px-6 rounded-md border border-border-border_primary">
              <NavigationForm initialData={tempItems[0]} />
            </div>
          )}
          <div className="px-6 py-5 bg-background-bg_tertiary">
            <Button onClick={handleAddTempItem}>Dodaj pozycję menu</Button>
          </div>
        </>
      ) : (
        <EmptyMenu />
      )}
    </div>
  );
};

export default function Page() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
