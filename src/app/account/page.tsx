import { redirect } from "next/navigation";
import { BudgetOverview } from "../components/BudgetOverview";
import { OperationModalWrapper } from "../components/OperationModal/OperationModalWrapper";
import { RecentTransactionsServer } from "../components/RecentTransactions/RecentTransactionsServer";
import s from "./page.module.scss";
import { RecentTransactionsModalServer } from "../components/RecentTransactionsModal/RecentTransactionsModalServer/RecentTransactionsModalServer";
import { getAuthenticatedUserId } from "@/lib/user";

export default async function page() {
  const userId = await getAuthenticatedUserId();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className={s.page}>
      <BudgetOverview />
      <RecentTransactionsServer />
      <OperationModalWrapper />
      <RecentTransactionsModalServer />
    </div>
  );
}
