"use server";

import { eq } from "drizzle-orm";

import { db } from "../../../../db";
import { TransactionTable, UserTable } from "../../../../db/schema";
import { Notice } from "@/app/ui/components/Notice";
import { getAuthenticatedUserId, getUserByClerkUserId } from "@/lib/user";

export const getBudgetOverview = async () => {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return {
      cards: [
        { image: "/total.svg", budget: 0, title: "Общий бюджет" },
        { image: "/spent.svg", budget: 0, title: "Потрачено" },
        { image: "/remaining.svg", budget: 0, title: "Доступно" },
      ],
      formatted: new Date().toLocaleDateString("ru-RU", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      dailyBudget: 0,
      progress: 0,
      notice: null,
    };
  }

  let dbUser = await getUserByClerkUserId(userId);

  if (!dbUser) {
    try {
      const [newUser] = await db
        .insert(UserTable)
        .values({
          clerkUserId: userId,
          email: `user_${userId}@example.com`,
          name: "Без имени",
        })
        .returning();

      dbUser = newUser;
      console.log("Создан новый пользователь:", newUser);
    } catch (error) {
      console.error("❌ Ошибка при создании пользователя для бюджета:", error);
      dbUser = null;
    }
  }

  let transactions: Array<{ type: string; amount: number }> = [];

  if (dbUser) {
    try {
      transactions = await db.select().from(TransactionTable).where(eq(TransactionTable.userId, dbUser.id));
    } catch (error) {
      console.error("❌ Ошибка при загрузке транзакций для бюджета:", error);
    }
  }

  const income = transactions.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const available = income - expenses;
  const progress = income === 0 ? 0 : Math.min((expenses / income) * 100, 100);

  const now = new Date();
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const remainingDays = Math.max(lastDayOfMonth.getDate() - now.getDate(), 1);

  const dailyBudget = Math.floor(available / remainingDays);

  const formatted = now.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const notice =
    income === 0 ? (
      <Notice description="Вы ещё не указали доход. Добавьте бюджет, чтобы начать отслеживание расходов" />
    ) : income < expenses ? (
      <Notice description="Ваши расходы превысили бюджет. Проверьте траты и скорректируйте план" type="error" />
    ) : progress > 80 ? (
      <Notice description="Использовано более 80% бюджета. Будьте внимательны с оставшимися средствами" type="warning" />
    ) : null;

  const cards = [
    { image: "/total.svg", budget: income, title: "Общий бюджет" },
    { image: "/spent.svg", budget: expenses, title: "Потрачено" },
    { image: "/remaining.svg", budget: Math.max(available, 0), title: "Доступно" },
  ];

  return { cards, formatted, dailyBudget, progress, notice };
};
