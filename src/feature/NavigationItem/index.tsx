"use client";

import React, { FC, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { INavigationItem } from "@/types/types";
import NavigationList from "../NavigationList";
import { useDispatch } from "react-redux";
import { REMOVE_ITEM } from "@/store/slices/navigationSlice";
import ListItem from "@/components/ListItem";
import NavigationEditForm from "../NavigationEditForm";
import NavigationAddForm from "../NavigationAddForm";

interface NavigationItemProps {
  item: INavigationItem;
}

const NavigationItem: FC<NavigationItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(false);
  const [newItem, setNewItem] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
  };

  const handleDelete = () => {
    dispatch(REMOVE_ITEM(item.id));
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleAdd = () => {
    setNewItem(true);
  };

  const handleCloseForm = () => {
    setNewItem(false);
  };

  return (
    <li
      ref={setNodeRef}
      style={{ ...style, marginTop: 0 }}
      {...attributes}
      {...listeners}
      className="bg-border-border_secondary flex flex-col gap-px"
    >
      <ListItem
        item={item}
        editable={editable}
        onDelete={() => handleDelete()}
        onEdit={() => handleEdit()}
        onAdd={() => handleAdd()}
        onCloseEdit={() => setEditable(false)}
      >
        {(item.children || newItem) && (
          <NavigationList items={item.children} parentId={item.id}>
            {newItem && (
              <NavigationAddForm
                initialData={{
                  id: Math.floor(Math.random() * 1000000000).toString(),
                  label: "",
                  url: "",
                  depth: item.depth + 1,
                }}
                parentId={item.id}
                handleClose={handleCloseForm}
              />
            )}
          </NavigationList>
        )}
      </ListItem>
    </li>
  );
};

export default NavigationItem;
