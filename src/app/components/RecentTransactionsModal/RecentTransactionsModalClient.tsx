"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useModalStore } from "../../../../stores/modalStore";

import s from "./RecentTransactionsModalClient.module.scss";
import { categoryIcons } from "@/app/mockData";
import { TransactionItem } from "@/app/ui/components/TransactionItem";

type TRecentTransactionsModalClientProps = {
  transactions: {
    id: number;
    title: string;
    category: string;
    amount: number;
    date: Date;
    type: string;
    icon: string | null;
    userId: number;
    description: string | null;
  }[];
};
export const RecentTransactionsModalClient = ({ transactions }: TRecentTransactionsModalClientProps) => {
  const { isTransactionOpen, openEditModal, closeTransactionModal, setSelectedTransaction } = useModalStore();

  useEffect(() => {
    document.body.style.overflow = isTransactionOpen ? "hidden" : "auto";
  }, [isTransactionOpen]);

  if (!isTransactionOpen) return null;

  return (
    <div className={s.recentTransactionsModal__container}>
      <div className={s.recentTransactionsModal__content}>
        <div className={s.recentTransactionsModal__header}>
          <div>
            <h2>Последние операции</h2>
            <p>Ваши недавние доходы и расходы</p>
          </div>
          <Image src="cross.svg" alt="Exit" width={24} height={24} onClick={closeTransactionModal} className={s.recentTransactionsModal__closeButton} />
        </div>

        <div className={s.recentTransactionsModal__transactions}>
          {transactions.map((transaction) => {
            const IconComponent = categoryIcons[transaction.icon as keyof typeof categoryIcons];

            return (
              <TransactionItem
                key={transaction.id}
                id={transaction.id}
                type={transaction.type as "expense" | "income"}
                icon={IconComponent ? <IconComponent width={24} height={24} /> : null}
                iconName={transaction.icon}
                title={transaction.title}
                category={transaction.category}
                date={transaction.date}
                amount={transaction.amount}
                setSelectedTransaction={setSelectedTransaction}
                openEditModal={openEditModal}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
