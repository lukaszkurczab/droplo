"use client";

import React, { FC } from "react";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import NavigationItem from "../NavigationItem";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { REORDER_ITEMS } from "@/store/slices/navigationSlice";
import { INavigationItem } from "@/types/types";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

interface NavigationListProps {
  items: INavigationItem[] | undefined;
  parentId?: string | undefined;
  children?: React.ReactNode;
}

const NavigationList: FC<NavigationListProps> = ({
  items,
  parentId,
  children,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (items && over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      const reorderedItems = arrayMove(items, oldIndex, newIndex);

      dispatch(
        REORDER_ITEMS({
          items: reorderedItems,
          parentId,
        })
      );
    }
  };

  return (
    <>
      {items && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          modifiers={[restrictToParentElement, restrictToVerticalAxis]}
        >
          <SortableContext
            items={items.map((item) => item.id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-2">
              {items.map((item) => (
                <NavigationItem key={item.id} item={item} />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      )}
      {children}
    </>
  );
};

export default NavigationList;
