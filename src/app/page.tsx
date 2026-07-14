import { Button } from "./ui/components/Button";
import { redirect } from "next/navigation";

import { SignInButton, SignUpButton, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import s from "./page.module.scss";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect("/account");
  }

  return (
    <div className={s.page}>
      <h1 className={s.page__title}>
        Добро пожаловать в<br /> <span>FinanceTracker</span>
      </h1>
      <p className={s.page__description}>Ваш инструмент для управления финансами</p>

      <SignedOut>
        <div className={s.page__auth}>
          <SignUpButton mode="modal" forceRedirectUrl="/account">
            <button type="button" className={s.page__primary}>
              ЗАРЕГИСТРИРОВАТЬСЯ
            </button>
          </SignUpButton>

          <SignInButton mode="modal" forceRedirectUrl="/account">
            <button type="button" className={s.page__secondaryLink}>
              У меня уже есть аккаунт
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}
