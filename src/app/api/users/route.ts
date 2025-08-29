import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../../db";
import { UserTable } from "../../../../db/schema";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { id, email, name } = data;

    const [user] = await db
      .insert(UserTable)
      .values({
        id,
        name,
        email,
      })
      .returning();

    return NextResponse.json(user);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
