import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import { TransactionItem } from "@/app/ui/components/TransactionItem";
import { Button } from "@/app/ui/components/Button";

import { db } from "../../../../db";
import { TransactionTable, UserTable } from "../../../../db/schema";

import s from "./RecentTransactions.module.scss";
import { HeaderTransactions } from "./HeaderTransactions";

export const RecentTransactions = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);

  const user = dbUser[0];
  const dbTransaction = user ? await db.select().from(TransactionTable).where(eq(TransactionTable.userId, user.id)) : [];

  return (
    <div className={s.recentTransactions}>
      <HeaderTransactions />

      <div className={s.recentTransactions__transactionsList}>
        {dbTransaction.length > 0 ? (
          dbTransaction.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              id={transaction.id}
              type={transaction.type as "expense" | "income"}
              icon={transaction.icon}
              title={transaction.title}
              category={transaction.category}
              date={transaction.date}
              amount={transaction.amount}
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
