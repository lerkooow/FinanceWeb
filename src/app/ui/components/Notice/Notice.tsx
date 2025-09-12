import Image from "next/image";
import s from "./Notice.module.scss";

type TNoticeProps = {
  description: string;
  type?: "info" | "success" | "warning" | "error";
  icon?: string;
};

export const Notice = ({ description, type = "info", icon }: TNoticeProps) => {
  return (
    <div className={`${s.notice} ${s[`notice--${type}`]}`}>
      {icon && <Image src={icon} alt={type ?? ""} width={24} height={24} />}
      <p>{description}</p>
    </div>
  );
};
