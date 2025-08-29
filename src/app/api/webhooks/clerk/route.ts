import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import { db } from "../../../../../db";
import { UserTable } from "../../../../../db/schema";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Please add CLERK_WEBHOOK_SECRET to your environment variables");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occurred", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Webhook with ID of ${id} and type of ${eventType}`);

  if (eventType === "user.created") {
    try {
      const { id: clerkUserId, email_addresses, first_name, last_name, username } = evt.data;

      const email = email_addresses[0]?.email_address;
      const name = first_name && last_name ? `${first_name} ${last_name}` : username || "Пользователь";

      const [user] = await db
        .insert(UserTable)
        .values({
          clerkUserId,
          name,
          email,
        })
        .returning();

      console.log("✅ Пользователь создан:", user);
    } catch (error) {
      console.error("❌ Ошибка при создании пользователя:", error);
    }
  }

  return NextResponse.json({ message: "Success" });
}
