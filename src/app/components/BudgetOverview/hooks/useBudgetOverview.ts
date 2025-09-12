import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { db } from "../../../../../db";
import { TransactionTable, UserTable } from "../../../../../db/schema";

export const useBudgetOverview = async () => {
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

  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const formatted = now.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const remainingDays = lastDayOfMonth.getDate() - now.getDate();

  const noticeError = income < expenses;
  const dailyBudget = Math.floor(available / remainingDays);

  return { formatted, noticeError, dailyBudget, income, available, progress, expenses };
};
