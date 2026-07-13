import { desc, eq } from "drizzle-orm";
import { db } from "../../../../../db";
import { TransactionTable } from "../../../../../db/schema";
import { RecentTransactions } from "../RecentTransactions";
import { getAuthenticatedUserId, getUserByClerkUserId } from "@/lib/user";

export const RecentTransactionsServer = async () => {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return <RecentTransactions transactions={[]} />;
  }

  const user = await getUserByClerkUserId(userId);

  const dbTransaction = user ? await db.select().from(TransactionTable).where(eq(TransactionTable.userId, user.id)).orderBy(desc(TransactionTable.id)) : [];

  return <RecentTransactions transactions={dbTransaction} />;
};
