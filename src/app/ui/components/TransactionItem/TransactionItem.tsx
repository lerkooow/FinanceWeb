"use client";

import { Trash } from "lucide-react";

import { deleteTransactionAction } from "@/app/actions/transactions";

import s from "./TransactionItem.module.scss";

type TTransactionItemProps = {
  id: number;
  type: "expense" | "income";
  icon: React.ReactNode;
  title: string;
  category: string;
  date: Date;
  amount: number;
};

export const TransactionItem = ({ id, type, icon, title, category, date, amount }: TTransactionItemProps) => {
  const handleDelete = async () => {
    try {
      await deleteTransactionAction(id);
    } catch (error) {
      console.error("Ошибка при удалении транзакции:", error);
      alert("Ошибка при удалении транзакции");
    }
  };

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
    return type === "income" ? `+${formatted} ₽` : `-${formatted} ₽`;
  };

  return (
    <div key={id} className={`${s.transactionItem} ${type === "expense" ? s["transactionItem--expense"] : s["transactionItem--income"]}`}>
      <div className={s.transactionItem__transactionContent}>
        <div className={s.transactionItem__transactionInfo}>
          <div className={s.transactionItem__transactionIcon}>{icon}</div>
          <div>
            <h4 className={s.transactionItem__transactionTitle}>{title}</h4>
            <p className={s.transactionItem__transactionCategory}>{category}</p>
          </div>
        </div>
        <div className={s.transactionItem__transactionDate}>{formatDate(date)}</div>
      </div>
      <div className={`${s.transactionItem__transactionAmount} ${type === "expense" ? s["transactionItem__transactionAmount--expense"] : s["transactionItem__transactionAmount--income"]}`}>
        {formatAmount(amount)}
      </div>
      <Trash className={`${s.transactionItem__deleteIcon}`} onClick={handleDelete} />
    </div>
  );
};
