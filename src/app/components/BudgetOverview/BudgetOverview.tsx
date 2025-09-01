import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { BudgetCard } from "@/app/ui/components/BudgetCard";
import { ProgressSection } from "@/app/ui/components/ProgressSection";

import { db } from "../../../../db";
import { UserTable } from "../../../../db/schema";

import s from "./BudgetOverview.module.scss";

export const BudgetOverview = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);

  const user = dbUser[0];
  console.log("🚀 ~ BudgetOverview ~ user:", user);

  const progress: number = user.budget ? (0 / user.budget) * 100 : 0;

  return (
    <div className={s.budgetOverview}>
      <div>
        <h2 className={s.budgetTitle}>Обзор бюджета</h2>
        <p className={s.budgetSubtitle}>Мониторинг финансовых показателей в реальном времени</p>
      </div>

      <div className={s.budgetCards}>
        <BudgetCard image="/total.svg" budget={user.budget ?? 0} className="budgetCard--total" title="Общий бюджет" />
        <BudgetCard image="/spent.svg" budget={0} className="budgetCard--spent" title="Потрачено" />
        <BudgetCard image="/remaining.svg" budget={0} className="budgetCard--remaining" title="Доступно" />
      </div>

      <ProgressSection progress={progress} title="Использование бюджета" />
    </div>
  );
};
