import React, { FC, ReactNode } from "react";

interface TypographyProps {
  as?: keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
}

const Typography: FC<TypographyProps> = ({
  as: Tag = "p",
  children,
  className = "",
}) => {
  const baseStyles = "text.text_primary text-base font-medium";
  const combinedStyles = `${baseStyles} ${className}`;

  return <Tag className={combinedStyles}>{children}</Tag>;
};

export default Typography;
