"use client";
import { TransactionItem } from "@/app/ui/components/TransactionItem";

import { categoryIcons } from "@/app/mockData";

import { useModalStore } from "../../../../stores/modalStore";
import { EmptyTransactions } from "./EmptyTransactions";
import { BlockHeader } from "@/app/ui/components/BlockHeader/BlockHeader";
import { Button } from "@/app/ui/components/Button";

import s from "./RecentTransactions.module.scss";

type TRecentTransactionsProps = {
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

export const RecentTransactions = ({ transactions }: TRecentTransactionsProps) => {
  const { setSelectedTransaction, openEditModal, openAddModal, openTransactionModal, setType } = useModalStore();
  const handleClick = () => {
    openAddModal();
    setType("add");
  };

  const handleTransactionClick = () => {
    openTransactionModal();
  };

  return (
    <div className={s.recentTransactions}>
      <BlockHeader title="Последние операции" subtitle="Ваши недавние доходы и расходы" buttonText="Добавить операцию" icon="/plus.svg" onButtonClick={handleClick} />
      <div className={s.recentTransactions__transactionsList}>
        {transactions.length > 0 ? (
          transactions.slice(0, 5).map((transaction) => {
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
          })
        ) : (
          <EmptyTransactions />
        )}
        {transactions.length > 6 && (
          <Button className={s.recentTransactions__button} onClick={handleTransactionClick}>
            Показать больше транзакций
          </Button>
        )}
      </div>
    </div>
  );
};
