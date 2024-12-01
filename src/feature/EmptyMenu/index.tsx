"use client";

import React, { useState } from "react";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Image from "next/image";
import NavigationForm from "../NavigationForm";
import { INavigationItem } from "@/types/types";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import {
  ADD_ITEM,
  ADD_TEMP_ITEM,
  EDIT_ITEM,
  REMOVE_ITEM,
} from "@/store/slices/navigationSlice";

const EmptyMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigationItems = useSelector(
    (state: RootState) => state.navigation.navigationItems
  );
  const tempItems = useSelector(
    (state: RootState) => state.navigation.tempItems
  );

  const handleAdd = () => {
    const tempItem: INavigationItem = {
      id: Math.floor(Math.random() * 1000000000).toString(),
      label: "",
      url: "",
    };

    dispatch(ADD_TEMP_ITEM(tempItem));
  };

  return (
    <div className="flex flex-col items-center p-6">
      {!navigationItems.length ? (
        <>
          <Typography as="h1" className="font-semibold text-base">
            Menu jest puste
          </Typography>
          <Typography as="h2" className="mb-6 mt-1 font-normal">
            W tym menu nie ma jeszcze żadnych linków.
          </Typography>
          <Button variant="contained" onClick={() => handleAdd()}>
            <Image alt="Add" src="/add.svg" width={20} height={20} />
            <Typography as="p" className="text-sm text-text-text_primary_fg">
              Dodaj pozycję menu
            </Typography>
          </Button>
        </>
      ) : (
        <NavigationForm initialData={tempItems[0]} />
      )}
    </div>
  );
};

export default EmptyMenu;
