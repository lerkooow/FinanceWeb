import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { BudgetCard } from "@/app/ui/components/BudgetCard";
import { ProgressSection } from "@/app/ui/components/ProgressSection";

import { db } from "../../../../db";
import { TransactionTable, UserTable } from "../../../../db/schema";

import s from "./BudgetOverview.module.scss";

export const BudgetOverview = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);

  const user = dbUser[0];

  const dbTransaction = user ? await db.select().from(TransactionTable).where(eq(TransactionTable.userId, user.id)) : [];
  const income = dbTransaction.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);

  const expenses = dbTransaction.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const available = income - expenses;
  const progress = income === 0 ? 0 : Math.min((expenses / income) * 100, 100);

  return (
    <div className={s.budgetOverview}>
      <div>
        <h2 className={s.budgetTitle}>Обзор бюджета</h2>
        <p className={s.budgetSubtitle}>Мониторинг финансовых показателей в реальном времени</p>
      </div>

      <div className={s.budgetCards}>
        <BudgetCard image="/total.svg" budget={income} className="budgetCard--total" title="Общий бюджет" />
        <BudgetCard image="/spent.svg" budget={expenses} className="budgetCard--spent" title="Потрачено" />
        <BudgetCard image="/remaining.svg" budget={available} className="budgetCard--remaining" title="Доступно" />
      </div>

      <ProgressSection progress={progress} title="Использование бюджета" />
    </div>
  );
};
