"use client";

import Image from "next/image";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";

import s from "./Header.module.scss";

export const Header = () => {
  const { user } = useUser();

  return (
    <div className={s.header}>
      <div className={s.header__logo}>
        <div className={s.header__logoIcon}>
          <Image src="/wallet.svg" alt="Wallet Icon" width={24} height={24} />
        </div>
        <div className={s.header__logoText}>
          <h2>FinanceTracker</h2>
          <p>Контроль расходов</p>
        </div>
      </div>
      <SignedIn>
        <div className={s.header__user}>
          <p className={s.header__username}>{user?.username}</p>
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: "40px",
                  height: "40px",
                },
              },
            }}
          />
        </div>
      </SignedIn>
    </div>
  );
};
