import { desc, eq } from "drizzle-orm";
import { db } from "../../../../../db";
import { TransactionTable } from "../../../../../db/schema";
import { RecentTransactionsModalClient } from "../RecentTransactionsModalClient";
import { getAuthenticatedUserId, getUserByClerkUserId } from "@/lib/user";

export const RecentTransactionsModalServer = async () => {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return <RecentTransactionsModalClient transactions={[]} />;
  }

  const user = await getUserByClerkUserId(userId);

  const dbTransactions = user ? await db.select().from(TransactionTable).where(eq(TransactionTable.userId, user.id)).orderBy(desc(TransactionTable.id)) : [];

  return <RecentTransactionsModalClient transactions={dbTransactions} />;
};
