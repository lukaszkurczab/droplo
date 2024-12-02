"use client";

import React from "react";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { ADD_TEMP_ITEM } from "@/store/slices/navigationSlice";

const EmptyMenu: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAdd = () => {
    dispatch(ADD_TEMP_ITEM());
  };

  return (
    <div className="flex flex-col items-center p-6 border border-border-border_primary rounded-md overflow-hidden">
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
    </div>
  );
};

export default EmptyMenu;
