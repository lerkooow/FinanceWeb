import { BudgetOverview } from "../components/BudgetOverview";
import { RecentTransactions } from "../components/RecentTransactions";

import s from "./page.module.scss";

export default function page() {
  return (
    <div className={s.page}>
      <BudgetOverview />
      <RecentTransactions />
    </div>
  );
}
