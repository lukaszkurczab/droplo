"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyMenu from "@/feature/EmptyMenu";
import NavigationList from "@/feature/NavigationList";
import { AppDispatch, RootState } from "@/store/store";
import NavigationAddForm from "@/feature/NavigationAddForm";
import Button from "@/components/Button";
import { ADD_TEMP_ITEM } from "@/store/slices/navigationSlice";

const MainPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { navigationItems, tempItems } = useSelector(
    (state: RootState) => state.navigation
  );

  const handleAddTempItem = () => {
    dispatch(ADD_TEMP_ITEM());
  };

  return (
    <div className="m-5">
      {navigationItems.length ? (
        <div className="border border-border-border_primary rounded-md overflow-hidden">
          <NavigationList items={navigationItems}>
            {tempItems.length ? (
              <NavigationAddForm initialData={tempItems[0]} />
            ) : null}
            <div className="px-6 py-5 bg-background-bg_tertiary border-t">
              <Button onClick={handleAddTempItem}>Dodaj pozycję menu</Button>
            </div>
          </NavigationList>
        </div>
      ) : tempItems.length ? (
        <NavigationAddForm initialData={tempItems[0]} />
      ) : (
        <EmptyMenu />
      )}
    </div>
  );
};

export default MainPage;
