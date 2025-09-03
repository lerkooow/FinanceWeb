import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { BudgetOverview } from "../components/BudgetOverview";

import s from "./page.module.scss";
import { AddOperationModal } from "../components/AddOperationModal";
import { RecentTransactionsServer } from "../components/RecentTransactions/RecentTransactionsServer/RecentTransactionsServer";

export default async function page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  // const user = await currentUser();

  // if (user) {
  //   await createOrGetUser(user.id, user.emailAddresses[0]?.emailAddress || "", user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.username || "Пользователь");
  // }

  return (
    <div className={s.page}>
      <BudgetOverview />
      <RecentTransactionsServer />
      <AddOperationModal />
    </div>
  );
}
