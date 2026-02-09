import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { headers } from "next/headers";
import type { WebhookEvent } from "@clerk/nextjs/server";

import { db } from "../../../../../db";
import { UserTable } from "../../../../../db/schema";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error("Переменная окружения CLERK_WEBHOOK_SECRET не задана. Добавьте её в настройки окружения.");
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Отсутствуют обязательные заголовки Svix", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Ошибка проверки webhook от Clerk:", error);
    return new Response("Не удалось проверить подпись webhook", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  console.log(`Получен webhook. ID события: ${id}, тип события: ${eventType}`);

  if (eventType === "user.created") {
    const { id: clerkUserId, email_addresses, first_name, last_name, username } = evt.data;

    const email = email_addresses?.[0]?.email_address ?? null;
    const name = first_name && last_name ? `${first_name} ${last_name}` : (username ?? "Пользователь");

    try {
      const [user] = await db
        .insert(UserTable)
        .values({
          clerkUserId,
          name,
          email,
        })
        .returning();

      console.log("Пользователь успешно создан в базе данных:", user);
    } catch (error) {
      console.error("Ошибка при сохранении пользователя в базе данных:", error);
    }
  }

  return NextResponse.json({ message: "Webhook успешно обработан" });
}
