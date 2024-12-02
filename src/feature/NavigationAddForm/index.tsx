"use client";

import React from "react";
import { useDispatch } from "react-redux";
import {
  ADD_ITEM,
  REMOVE_TEMP_ITEM,
  ADD_CHILD,
} from "@/store/slices/navigationSlice";
import Form from "@/feature/Form";
import { INavigationItem } from "@/types/types";

interface NavigationAddFormProps {
  initialData: INavigationItem;
  handleClose?: () => void;
  parentId?: string | null;
}

const NavigationAddForm: React.FC<NavigationAddFormProps> = ({
  initialData,
  handleClose,
  parentId = null,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (data: INavigationItem) => {
    if (parentId) {
      dispatch(ADD_CHILD({ parentId, child: data }));
    } else {
      dispatch(ADD_ITEM(data));
      dispatch(REMOVE_TEMP_ITEM(data.id));
    }
    handleClose?.();
  };

  const handleCancel = () => {
    dispatch(REMOVE_TEMP_ITEM(initialData.id));
    handleClose?.();
  };

  return (
    <div className="py-4 px-6">
      <Form
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        onDelete={handleCancel}
        submitText="Dodaj"
      />
    </div>
  );
};

export default NavigationAddForm;
