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
};

export const Button = ({ children, className = "", icon = "", onClick, ...props }: TButtonProps) => {
  return (
    <button className={`${s.button} ${s[className]}`} onClick={onClick}>
      {/* <div className={s.recentTransactions__addButtonIcon}>-</div> */}
      <Image src={icon} alt="Icon" width={24} height={24} />
      {children}
    </button>
  );
};
