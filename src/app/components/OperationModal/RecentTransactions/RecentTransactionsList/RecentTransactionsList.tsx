"use client";
import { HeaderTransactions } from "../HeaderTransactions";

import { TransactionItem } from "@/app/ui/components/TransactionItem";

import { categoryIcons } from "@/app/mockData";

import { useModalStore } from "../../../../../../stores/modalStore";
import s from "./RecentTransactionsList.module.scss";

export const RecentTransactionsList = ({ transactions }: { transactions: any[] }) => {
  const { setSelectedTransaction, openAddModal, openEditModal } = useModalStore();

  return (
    <div className={s.recentTransactions}>
      <HeaderTransactions />

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
