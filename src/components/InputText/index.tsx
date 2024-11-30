import React, { FC, InputHTMLAttributes, ReactNode } from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  errorMessage?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputText: FC<InputTextProps> = ({
  placeholder,
  iconLeft,
  iconRight,
  errorMessage,
  value,
  onChange,
  className = "",
  ...props
}) => {
  const baseStyle =
    "flex border  rounded-md overflow-hidden px-3.5 py-2 items-center gap-2 mt-1.5";
  const errorStyles = "border-red-500 focus:ring-red-500";

  return (
    <div
      className={`${baseStyle}  ${
        errorMessage ? errorStyles : "border-border-border_primary"
      } ${className}`}
    >
      {iconLeft && (
        <span className="text-foreground-fq_quaternary">{iconLeft}</span>
      )}
      <input
        className="w-full border-none text-sm focus:outline-none placeholder:text-text-text_placeholder"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {iconRight && (
        <span className="text-foreground-fq_quaternary">{iconRight}</span>
      )}
    </div>
  );
};

export default InputText;
