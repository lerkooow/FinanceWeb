"use client";

import { useState } from "react";

import { Button } from "@/app/ui/components/Button";
import { TransactionItem } from "@/app/ui/components/TransactionItem";

import { transactionsData } from "@/app/mockData";

import s from "./RecentTransactions.module.scss";

export const RecentTransactions = () => {
  const [transactions, setTransactions] = useState(transactionsData);

  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Сегодня";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Вчера";
    } else {
      return date.toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "short",
      });
    }
  };

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toLocaleString();
    return amount >= 0 ? `+${formatted} ₽` : `-${formatted} ₽`;
  };

  const handleAddExpense = () => {
    // Здесь будет логика добавления нового расхода
    console.log("Добавить расход");
  };

  const handleAddIncome = () => {
    // Здесь будет логика добавления нового дохода
    console.log("Добавить доход");
  };

  return (
    <div className={s.recentTransactions}>
      <div className={s.recentTransactions__header}>
        <div className={s.recentTransactions__headerContent}>
          <h2 className={s.recentTransactions__title}>Последние операции</h2>
          <p className={s.recentTransactions__subtitle}>Ваши недавние доходы и расходы</p>
        </div>
        <Button className="button--income" icon="plus.svg">
          Добавить доходы
        </Button>
        <Button className="button--expense" icon="minus.svg">
          Добавить расходы
        </Button>
      </div>

      <div className={s.recentTransactions__transactionsList}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              type={transaction.type}
              icon={transaction.icon}
              title={transaction.title}
              category={transaction.category}
              date={transaction.date}
              amount={transaction.amount}
              formatDate={formatDate}
              formatAmount={formatAmount}
            />
          ))
        ) : (
          <div className={s.recentTransactions__emptyState}>
            <div className={s.recentTransactions__emptyIcon}>📊</div>
            <div className={s.recentTransactions__emptyText}>Нет операций</div>
            <div className={s.recentTransactions__emptySubtext}>Добавьте первую операцию, чтобы начать отслеживание расходов</div>
          </div>
        )}
      </div>
    </div>
  );
};
