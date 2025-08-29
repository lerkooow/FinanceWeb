import { db } from "./index";
import { UserTable, TransactionTable } from "./schema";

async function seed() {
  await db.delete(TransactionTable);
  await db.delete(UserTable);

  const [user] = await db
    .insert(UserTable)
    .values({
      name: "Valeriia",
      email: "val@example.com",
    })
    .returning();

  await db.insert(TransactionTable).values([
    {
      title: "Продукты в Пятёрочке",
      category: "Продукты",
      amount: -2450,
      date: new Date("2024-12-15"),
      type: "expense",
      icon: "🛒",
      userId: user.id,
    },
    {
      title: "Зарплата",
      category: "Доход",
      amount: 85000,
      date: new Date("2024-12-10"),
      type: "income",
      icon: "💰",
      userId: user.id,
    },
  ]);

  console.log("✅ Seed завершен");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
