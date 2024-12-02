"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { EDIT_ITEM, REMOVE_ITEM } from "@/store/slices/navigationSlice";
import Form from "@/feature/Form";
import { INavigationItem } from "@/types/types";

interface NavigationEditFormProps {
  initialData: INavigationItem;
  handleClose: () => void;
}

const NavigationEditForm: React.FC<NavigationEditFormProps> = ({
  initialData,
  handleClose,
}) => {
  const dispatch = useDispatch();

  const handleSubmit = (data: INavigationItem) => {
    dispatch(EDIT_ITEM({ id: data.id, updatedItem: data }));
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleDelete = () => {
    dispatch(REMOVE_ITEM(initialData.id));
    handleClose();
  };

  return (
    <Form
      initialData={initialData}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onDelete={handleDelete}
      submitText="Zaktualizuj"
    />
  );
};

export default NavigationEditForm;
