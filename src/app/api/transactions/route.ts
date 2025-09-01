import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { TransactionTable, UserTable } from "../../../../db/schema";
import { db } from "../../../../db";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await req.json();
    const { title, category, amount, type, icon, date } = body;

    const dbUser = await db.select().from(UserTable).where(eq(UserTable.clerkUserId, userId)).limit(1);
    if (dbUser.length === 0) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const user = dbUser[0];

    const inserted = await db
      .insert(TransactionTable)
      .values({
        userId: user.id,
        title,
        category,
        amount,
        type,
        icon,
        date: new Date(date),
      })
      .returning();

    return NextResponse.json({ transaction: inserted[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add transaction" }, { status: 500 });
  }
}
