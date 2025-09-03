import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const UserTable = pgTable("user", {
  id: serial("id").primaryKey(),
  clerkUserId: text("clerk_user_id").unique(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
});

export const TransactionTable = pgTable("transactions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  amount: integer("amount").notNull(),
  date: timestamp("date", { mode: "date" }).notNull(),
  type: text("type").notNull(),
  icon: text("icon"),
  userId: integer("user_id")
    .notNull()
    .references(() => UserTable.id, { onDelete: "cascade" }),
  description: text("description"),
});

export const usersRelations = relations(UserTable, ({ many }) => ({
  transactions: many(TransactionTable),
}));

export const transactionsRelations = relations(TransactionTable, ({ one }) => ({
  user: one(UserTable, {
    fields: [TransactionTable.userId],
    references: [UserTable.id],
  }),
}));
