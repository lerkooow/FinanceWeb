"use server";

import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

import { db } from "../../../../db";
import { TransactionTable } from "../../../../db/schema";
import { createOrGetUser, getAuthenticatedUserId, getUserByClerkUserId } from "@/lib/user";

const getOrCreateDbUser = async (userId: string) => {
  const existingUser = await getUserByClerkUserId(userId);

  if (existingUser) {
    return existingUser;
  }

  try {
    return await createOrGetUser(userId, `user_${userId}@example.com`, "Без имени");
  } catch (error) {
    console.error("❌ Ошибка при создании пользователя для транзакции:", error);
    return null;
  }
};

export const deleteTransactionAction = async (transactionId: number) => {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return null;
  }

  const user = await getOrCreateDbUser(userId);

  if (!user) {
    return null;
  }

  try {
    await db.delete(TransactionTable).where(and(eq(TransactionTable.id, transactionId), eq(TransactionTable.userId, user.id)));
    revalidatePath("/account");
  } catch (error) {
    console.error("❌ Ошибка при удалении транзакции:", error);
  }

  return null;
};

export const addTransactionAction = async (data: { title: string; category: string; amount: number; type: "income" | "expense"; icon?: string; date?: string; description?: string }) => {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return null;
  }

  const user = await getOrCreateDbUser(userId);

  if (!user) {
    return null;
  }

  try {
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
  } catch (error) {
    console.error("❌ Ошибка при добавлении транзакции:", error);
    return null;
  }
};

export const updateTransactionAction = async (
  transactionId: number,
  data: { title: string; category: string; amount: number; type: "income" | "expense"; icon?: string; date?: string; description?: string },
) => {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    return null;
  }

  const user = await getOrCreateDbUser(userId);

  if (!user) {
    return null;
  }

  try {
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
  } catch (error) {
    console.error("❌ Ошибка при обновлении транзакции:", error);
    return null;
  }
};
