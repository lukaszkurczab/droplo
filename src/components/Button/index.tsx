import React, { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined" | "text";
  className?: string;
}

const Button: FC<ButtonProps> = ({
  variant = "outlined",
  className = "",
  children,
  ...props
}) => {
  const baseStyles =
    "px-3.5 py-2.5 rounded-lg font-medium flex items-center gap-1 transition-colors duration-200";

  const variants = {
    contained:
      "bg-buttons-button_primary border border-buttons-button_primary hover:bg-buttons-button_secondary_fb active:bg-buttons-button_primary",
    outlined:
      "border border-border-primary bg-background-bg_primary hover:bg-background-bg_secondary active:bg-background-bg_primary",
    text: "bg-transparent border-none hover:underline active:opacity-75",
  };

  const combinedStyles =
    `${baseStyles} ${variants[variant]} ${className}`.trim();

  const handlePointerDown = (event: React.PointerEvent) => {
    event.stopPropagation();
  };

  return (
    <button
      className={combinedStyles}
      onPointerDown={handlePointerDown}
      {...props}
    >
      {children || "Button"}
    </button>
  );
};

export default Button;
