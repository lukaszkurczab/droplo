"use client";

import React, { useState } from "react";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Image from "next/image";
import NavigationForm from "../NavigationForm";
import { INavigationItem } from "@/types/types";
import { useNavigation } from "@/context/navigationContext/navigationContext";

const EmptyMenu: React.FC = () => {
  const { state, dispatch } = useNavigation();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<INavigationItem | null>(null);

  const handleFormSubmit = (item: INavigationItem) => {
    if (editItem) {
      dispatch({
        type: "EDIT_ITEM",
        payload: { id: editItem.id, updatedItem: item },
      });
    } else {
      dispatch({ type: "ADD_ITEM", payload: item });
    }
    setShowForm(false);
    setEditItem(null);
  };

  const handleEdit = (item: INavigationItem) => {
    setEditItem(item);
    setShowForm(true);
  };

  const handleRemove = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <div className="flex flex-col items-center p-6">
      {state.navigationItems.length === 0 && !showForm ? (
        <>
          <Typography as="h1" className="font-semibold text-base">
            Menu jest puste
          </Typography>
          <Typography as="h2" className="mb-6 mt-1 font-normal">
            W tym menu nie ma jeszcze żadnych linków.
          </Typography>
          <Button variant="contained" onClick={() => setShowForm(true)}>
            <Image alt="Add" src="/add.svg" width={20} height={20} />
            <Typography as="p" className="text-sm text-text-text_primary_fg">
              Dodaj pozycję menu
            </Typography>
          </Button>
        </>
      ) : (
        <>
          {showForm ? (
            <NavigationForm
              initialData={editItem || undefined}
              onSubmit={handleFormSubmit}
              onAbort={() => {
                setShowForm(false);
                setEditItem(null);
              }}
            />
          ) : (
            <div>
              <ul>
                {state.navigationItems.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <Typography>{item.label}</Typography>
                    <div className="flex gap-2">
                      <Button onClick={() => handleEdit(item)}>Edytuj</Button>
                      <Button onClick={() => handleRemove(item.id)}>
                        Usuń
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
              <Button onClick={() => setShowForm(true)}>Dodaj nowy</Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EmptyMenu;
