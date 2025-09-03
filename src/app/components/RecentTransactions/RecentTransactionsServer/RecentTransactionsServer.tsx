import { auth } from "@clerk/nextjs/server";
import { eq, desc } from "drizzle-orm";
import { db } from "../../../../../db";
import { TransactionTable, UserTable } from "../../../../../db/schema";
import { RecentTransactionsList } from "../RecentTransactionsList";

export const RecentTransactionsServer = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("User is not authenticated");

  const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);

  const user = dbUser[0];

  const dbTransaction = user ? await db.select().from(TransactionTable).where(eq(TransactionTable.userId, user.id)).orderBy(desc(TransactionTable.id)) : [];

  return <RecentTransactionsList transactions={dbTransaction} />;
};
