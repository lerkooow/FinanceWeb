import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { UserTable } from "../../../../db/schema";
import { eq } from "drizzle-orm";

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
