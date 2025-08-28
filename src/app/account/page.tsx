import { BudgetOverview } from "../components/BudgetOverview";
import { ExpenseCharts } from "../components/ExpenseCharts/ExpenseCharts";
import { RecentTransactions } from "../components/RecentTransactions";

import s from "./page.module.scss";

export default function page() {
  return (
    <div className={s.page}>
      <BudgetOverview />
      <RecentTransactions />
      <ExpenseCharts />
    </div>
  );
}
