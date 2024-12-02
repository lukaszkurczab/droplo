import React, { FC } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import Typography from "@/components/Typography";
import NavigationEditForm from "@/feature/NavigationEditForm";
import { INavigationItem } from "@/types/types";

interface ListItemProps {
  item: INavigationItem;
  editable?: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onAdd: () => void;
  onCloseEdit: () => void;
  children?: React.ReactNode;
}

const ListItem: FC<ListItemProps> = ({
  item,
  editable = false,
  onDelete,
  onEdit,
  onAdd,
  onCloseEdit,
  children,
}) => {
  return (
    <>
      <div
        className="bg-background-bg_secondary mt-px"
        style={{ marginLeft: `${item.depth * 64}px` }}
      >
        {!editable ? (
          <div className="px-6 py-4 flex justify-between items-center bg-background-bg_primary">
            <div className="flex">
              <div className="px-4 flex items-center">
                <Image alt="Move" src="/move.svg" width={20} height={20} />
              </div>
              <div className="flex flex-col gap-1.5">
                <Typography className="font-semibold">{item.label}</Typography>
                <a
                  href={item.url}
                  className="text-text-text_tertiary hover:underline"
                >
                  {item.url}
                </a>
              </div>
            </div>
            <div className="flex">
              <Button
                className="rounded-e-none font-semibold text-sm px-4"
                onClick={onDelete}
              >
                Usuń
              </Button>
              <Button
                className="border-x-0 rounded-none font-semibold text-sm px-4"
                onClick={onEdit}
              >
                Edytuj
              </Button>
              <Button
                className="rounded-s-none font-semibold text-sm px-4"
                onClick={onAdd}
              >
                Dodaj pozycję menu
              </Button>
            </div>
          </div>
        ) : (
          <div className="mx-6 py-4">
            <NavigationEditForm
              initialData={item}
              handleClose={() => onCloseEdit()}
            />
          </div>
        )}
      </div>
      {children}
    </>
  );
};

export default ListItem;
