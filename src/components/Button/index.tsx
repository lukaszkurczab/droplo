import React, { FC, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined";
  className?: string;
}

const Button: FC<ButtonProps> = ({
  variant = "outlined",
  className = "",
  children,
  ...props
}) => {
  const baseStyles = "px-3.5 py-2.5 rounded-lg font-medium";

  const variants = {
    contained:
      "bg-buttons-button_primary text-text-text_primary_fg border border-buttons-button_primary hover:bg-buttons-button_secondary_fb active:bg-buttons-button_primary",
    outlined:
      "border border.border-primary text-text-text_secondary bg-background-bg_primary hover:bg-background-bg_secondary active:bg-background-bg_primary",
  };

  const combinedStyles = `${baseStyles} ${variants[variant]} ${className}`;

  return (
    <button className={combinedStyles} {...props}>
      {children}
    </button>
  );
};

export default Button;
