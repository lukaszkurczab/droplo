"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import InputText from "@/components/InputText";
import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Image from "next/image";
import { INavigationItem } from "@/types/types";

interface FormProps {
  initialData: INavigationItem;
  submitText: string;
  onSubmit: (data: INavigationItem) => void;
  onCancel: () => void;
  onDelete: () => void;
}

const Form: React.FC<FormProps> = ({
  initialData,
  submitText,
  onSubmit,
  onCancel,
  onDelete,
}) => {
  const { handleSubmit, control, reset } = useForm<INavigationItem>({
    defaultValues: initialData,
  });

  const submitHandler = (data: INavigationItem) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-background-bg_primary py-5 px-6 rounded-md border border-border-border_primary w-full flex items-start gap-4">
      <form onSubmit={handleSubmit(submitHandler)} className="space-y-4 w-full">
        <div>
          <Typography as="label" className="block text-sm font-medium">
            Nazwa
          </Typography>
          <Controller
            name="label"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field, fieldState }) => (
              <>
                <InputText {...field} placeholder="np. Promocje" />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div>
          <Typography as="label" className="block text-sm font-medium">
            Link
          </Typography>
          <Controller
            name="url"
            control={control}
            rules={{ required: "To pole jest wymagane" }}
            render={({ field, fieldState }) => (
              <>
                <InputText
                  {...field}
                  placeholder="Wklej lub wyszukaj"
                  iconLeft={
                    <Image
                      src="./search.svg"
                      alt="Szukaj"
                      width={20}
                      height={20}
                    />
                  }
                />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>
        <div className="flex gap-2">
          <Button onClick={onCancel}>Anuluj</Button>
          <Button
            type="submit"
            className="text-buttons-button_secondary_fb border-buttons-button_secondary"
          >
            {submitText}
          </Button>
        </div>
      </form>
      <Button className="px-2.5" variant="text" onClick={onDelete}>
        <Image src="./trash.svg" width={20} height={20} alt="Cancel" />
      </Button>
    </div>
  );
};

export default Form;
