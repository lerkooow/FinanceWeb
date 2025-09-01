import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { UserTable } from "../../../../db/schema";
import { eq, sql } from "drizzle-orm";

// Создание юзера (POST)
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { clerkUserId, email, name } = data;

    if (!clerkUserId || !email || !name) {
      return NextResponse.json({ error: "Missing required fields: clerkUserId, email, name" }, { status: 400 });
    }

    const existingUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, clerkUserId)).limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(existingUser[0]);
    }

    const [user] = await db
      .insert(UserTable)
      .values({
        clerkUserId,
        name,
        email,
      })
      .returning();

    return NextResponse.json(user);
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const data = await req.json();
    const { clerkUserId, amount } = data;

    if (!clerkUserId || typeof amount !== "number") {
      return NextResponse.json({ error: "Missing required fields: clerkUserId, amount" }, { status: 400 });
    }

    const [updatedUser] = await db
      .update(UserTable)
      .set({
        budget: sql`${UserTable.budget} + ${amount}`,
      })
      .where(eq(UserTable.clerkUserId, clerkUserId))
      .returning();

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser);
  } catch (err) {
    console.error("Database error:", err);
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 });
  }
}
