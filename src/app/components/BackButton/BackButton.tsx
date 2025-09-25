"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { useMediaQuery } from "usehooks-ts";

import s from "./BackButton.module.scss";

export const BackButton = () => {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width: 375px)");

  const handleClickReturn = () => {
    router.push("/");
  };

  return (
    <div className={s.backButton} onClick={handleClickReturn}>
      <Image src="/arrow.svg" height={32} width={32} alt="Arrow" className={s.backButton__arrow} />
      {!isMobile && <p>Вернуться обратно</p>}
    </div>
  );
};
