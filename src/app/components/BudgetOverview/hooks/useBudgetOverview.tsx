import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "../../../../../db";
import { TransactionTable, UserTable } from "../../../../../db/schema";
import { Notice } from "@/app/ui/components/Notice";

export const useBudgetOverview = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);

  const dbTransaction = dbUser[0] ? await db.select().from(TransactionTable).where(eq(TransactionTable.userId, dbUser[0].id)) : [];

  const income = dbTransaction.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = dbTransaction.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const available = income - expenses;
  const progress = income === 0 ? 0 : Math.min((expenses / income) * 100, 100);

  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formatted = now.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const remainingDays = lastDayOfMonth.getDate() - now.getDate();

  const dailyBudget = Math.floor(available / remainingDays);

  const renderNotice = () => {
    if (income === 0) {
      return <Notice description="Вы ещё не добавили бюджет. Укажите сумму дохода, чтобы начать отслеживать расходы" />;
    }
    if (income < expenses) {
      return <Notice description="Ваши расходы превысили установленный бюджет. Проверьте траты и скорректируйте план" type="error" />;
    }
    if (progress > 81) {
      return <Notice description="Вы израсходовали более 80% бюджета. Будьте внимательнее с оставшимися средствами" type="warning" />;
    }
    return null;
  };

  const cards = [
    { image: "/total.svg", budget: income, className: "budgetCard--total", title: "Общий бюджет" },
    { image: "/spent.svg", budget: expenses, className: "budgetCard--spent", title: "Потрачено" },
    { image: "/remaining.svg", budget: available > 0 ? available : 0, className: "budgetCard--remaining", title: "Доступно" },
  ];

  return { cards, formatted, dailyBudget, progress, renderNotice };
};
