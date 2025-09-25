"use client";

import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

import { Button } from "../Button";

import s from "./BlockHeader.module.scss";

type TBlockHeaderProps = {
  title: string;
  arrow?: boolean;
  subtitle: string;
  buttonText?: string;
  onButtonClick?: () => void;
  icon?: string;
};

export const BlockHeader = ({ title, arrow, subtitle, buttonText, icon, onButtonClick }: TBlockHeaderProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isMobileSmall = useMediaQuery("(max-width: 375px)");

  const router = useRouter();

  const handleClick = () => {
    router.push("/budget-overview-more");
  };

  return (
    <div className={s.blockHeader}>
      <div>
        <h2 className={s.blockHeader__title}>{title}</h2>
        <p className={s.blockHeader__subtitle}>{subtitle}</p>
      </div>

      {buttonText && (
        <Button className={s.blockHeader__primary} icon={icon} onClick={onButtonClick}>
          {buttonText}
        </Button>
      )}
      {arrow && isMobile && (
        <div className={s.blockHeader__arrow}>
          {!isMobileSmall && <p>Подробнее</p>}
          <Image src="/arrow.svg" height={32} width={32} alt="Arrow" className={s.blockHeader__icon} onClick={handleClick} />
        </div>
      )}
    </div>
  );
};
