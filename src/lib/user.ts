import { db } from "../../db";
import { UserTable } from "../../db/schema";
import { eq } from "drizzle-orm";

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
