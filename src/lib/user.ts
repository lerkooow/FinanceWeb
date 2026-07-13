import { auth } from "@clerk/nextjs/server";
import { db } from "../../db";
import { UserTable } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getAuthenticatedUserId() {
  try {
    const { userId } = await auth();
    return userId ?? null;
  } catch (error) {
    console.error("❌ Ошибка при получении пользователя из Clerk:", error);
    return null;
  }
}

export async function getUserByClerkUserId(clerkUserId: string) {
  if (!clerkUserId) {
    return null;
  }

  try {
    const users = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, clerkUserId)).limit(1);
    return users[0] ?? null;
  } catch (error) {
    console.error("❌ Ошибка при получении пользователя из базы данных:", error);
    return null;
  }
}

export async function createOrGetUser(clerkUserId: string, email: string, name: string) {
  try {
    const existingUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, clerkUserId)).limit(1);

    if (existingUser.length > 0) {
      return existingUser[0];
    }

    const [newUser] = await db
      .insert(UserTable)
      .values({
        clerkUserId,
        name,
        email,
      })
      .returning();

    console.log("✅ Пользователь создан в базе данных:", newUser);
    return newUser;
  } catch (error) {
    console.error("❌ Ошибка при создании пользователя:", error);
    throw error;
  }
}
