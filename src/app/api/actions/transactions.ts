"use server";

import { auth } from "@clerk/nextjs/server";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "../../../../db";
import { TransactionTable, UserTable } from "../../../../db/schema";

export const deleteTransactionAction = async (transactionId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);
  const user = dbUser[0];

  if (!user) {
    throw new Error("User not found");
  }

  await db.delete(TransactionTable).where(and(eq(TransactionTable.id, transactionId), eq(TransactionTable.userId, user.id)));

  revalidatePath("/account");
};

export const addTransactionAction = async (data: { title: string; category: string; amount: number; type: "income" | "expense"; icon?: string; date?: string; description?: string }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);
  const user = dbUser[0];

  if (!user) {
    throw new Error("User not found");
  }

  const [newTransaction] = await db
    .insert(TransactionTable)
    .values({
      userId: user.id,
      title: data.title,
      category: data.category,
      amount: data.amount,
      type: data.type,
      icon: data.icon,
      date: data.date ? new Date(data.date) : new Date(),
      description: data.description || null,
    })
    .returning();

  revalidatePath("/account");

  console.log("Транзакция добавлена:", newTransaction);

  return newTransaction;
};

export const updateTransactionAction = async (
  transactionId: number,
  data: { title: string; category: string; amount: number; type: "income" | "expense"; icon?: string; date?: string; description?: string }
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User is not authenticated");
  }

  const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);
  const user = dbUser[0];

  if (!user) {
    throw new Error("User not found");
  }

  const [updatedTransaction] = await db
    .update(TransactionTable)
    .set({
      title: data.title,
      category: data.category,
      amount: data.amount,
      type: data.type,
      icon: data.icon,
      date: data.date ? new Date(data.date) : new Date(),
      description: data.description || null,
    })
    .where(and(eq(TransactionTable.id, transactionId), eq(TransactionTable.userId, user.id)))
    .returning();

  revalidatePath("/account");

  console.log("Транзакция обновлена:", updatedTransaction);

  return updatedTransaction;
};
