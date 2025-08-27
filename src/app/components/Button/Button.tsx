import { ReactNode } from "react";

import s from "./Button.module.scss";

type TButtonProps = {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export const Button = ({ children, className, ...props }: TButtonProps) => {
  return (
    <button className={`${s.button} ${className}`} {...props}>
      {children}
    </button>
  );
};
