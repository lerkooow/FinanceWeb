import { Button } from "./ui/components/Button";
import { redirect } from "next/navigation";

import { SignInButton, SignUpButton, SignedOut, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import s from "./page.module.scss";

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
            <Button iconVisible={false} className="button--primary">
              ЗАРЕГИСТРИРОВАТЬСЯ
            </Button>
          </SignUpButton>

          <SignInButton mode="modal" forceRedirectUrl="/account">
            <p>У меня уже есть аккаунт</p>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}
