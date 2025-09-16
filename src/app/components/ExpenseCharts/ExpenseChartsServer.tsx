import { auth } from "@clerk/nextjs/server";
import { db } from "../../../../db";
import { TransactionTable, UserTable } from "../../../../db/schema";
import { desc, eq } from "drizzle-orm";
import { ExpenseCharts } from "./ExpenseCharts";

export const ExpenseChartsServer = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);
  const user = dbUser[0];

  const transactions = user ? await db.select().from(TransactionTable).where(eq(TransactionTable.userId, user.id)).orderBy(desc(TransactionTable.id)) : [];

  return <ExpenseCharts transactions={transactions} />;
};
