import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { createOrGetUser } from "../../lib/user";

import { BudgetOverview } from "../components/BudgetOverview";
import { ExpenseCharts } from "../components/ExpenseCharts/ExpenseCharts";
import { RecentTransactions } from "../components/RecentTransactions";
import { UserInfo } from "../components/UserInfo";

import s from "./page.module.scss";

export default async function page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const user = await currentUser();

  if (user) {
    await createOrGetUser(user.id, user.emailAddresses[0]?.emailAddress || "", user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username || "Пользователь");
  }

  return (
    <div className={s.page}>
      <UserInfo />
      <BudgetOverview />
      <RecentTransactions />
      <ExpenseCharts />
    </div>
  );
}
