"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/app/ui/components/Button";

export const TransactionActions = () => {
  const { user } = useUser();

  const addExpenseTransaction = async (data: { title: string; category: string; amount: number; type: "income" | "expense"; icon?: string; date?: string }) => {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: data.date || new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Ошибка при добавлении расходов");
      }

      const json = await res.json();
      console.log("Расходы добавлена:", json.transaction);

      window.location.reload();

      return json.transaction;
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении расходов");
    }
  };

  const addIncomeTransaction = async (data: { clerkUserId: string; amount: number }) => {
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Ошибка при обновлении бюджета");
      }

      const json = await res.json();
      console.log("Бюджет обновлён:", json);

      window.location.reload();
      return json;
    } catch (err) {
      console.error(err);
      alert("Ошибка при обновлении бюджета");
    }
  };

  const handleAddExpense = () => {
    addExpenseTransaction({
      title: "Кофе",
      category: "Еда",
      amount: 300,
      type: "expense",
      icon: "☕",
    });
  };

  const handleAddIncome = async () => {
    if (!user?.id) {
      alert("Пользователь не авторизован");
      return;
    }

    await addExpenseTransaction({
      title: "Зарплата",
      category: "Доход",
      amount: 50000,
      type: "income",
      icon: "💰",
    });

    await addIncomeTransaction({
      clerkUserId: user.id,
      amount: 50000,
    });
  };

  return (
    <>
      <Button className="button--income" icon="/plus.svg" onClick={handleAddIncome}>
        Добавить доходы
      </Button>
      <Button className="button--expense" icon="/minus.svg" onClick={handleAddExpense}>
        Добавить расходы
      </Button>
    </>
  );
};
