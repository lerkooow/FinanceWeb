import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { BudgetOverview } from "../components/BudgetOverview";
import { OperationModalWrapper } from "../components/OperationModal/OperationModalWrapper";
import { RecentTransactionsServer } from "../components/OperationModal/RecentTransactions/RecentTransactionsServer";

import s from "./page.module.scss";

export default async function page() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className={s.page}>
      <BudgetOverview />
      <RecentTransactionsServer />
      <OperationModalWrapper />
    </div>
  );
}
