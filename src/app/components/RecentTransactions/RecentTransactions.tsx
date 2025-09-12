"use client";

import { TransactionItem } from "@/app/ui/components/TransactionItem";

import { categoryIcons } from "@/app/mockData";

import { useModalStore } from "../../../../stores/modalStore";
import { EmptyTransactions } from "./EmptyTransactions";
import { BlockHeader } from "@/app/ui/components/BlockHeader/BlockHeader";
import s from "./RecentTransactions.module.scss";

export const RecentTransactions = ({ transactions }: { transactions: any[] }) => {
  const { setSelectedTransaction, openEditModal, openAddModal, setType } = useModalStore();
  const handleClick = () => {
    openAddModal();
    setType("add");
  };

  return (
    <div className={s.recentTransactions}>
      <BlockHeader title="Последние операции" subtitle="Ваши недавние доходы и расходы" buttonText="Добавить операцию" icon="/plus.svg" onButtonClick={handleClick} />
      <div className={s.recentTransactions__transactionsList}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => {
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
      </div>
    </div>
  );
};
