import { ReactNode } from "react";

import Image from "next/image";

import s from "./Button.module.scss";

type TButtonProps = {
  children?: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: string;
  iconVisible?: boolean;
};

export const Button = ({ children, className = "", icon = "", onClick, iconVisible = true }: TButtonProps) => {
  return (
    <button className={`${s.button} ${s[className]}`} onClick={onClick}>
      {iconVisible && <Image src={icon} alt="Icon" width={24} height={24} />}
      {children}
    </button>
  );
};
