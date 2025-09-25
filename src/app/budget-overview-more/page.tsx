import { BudgetOverviewMore } from "../components/BudgetOverviewMore";
import { ExpenseChartsServer } from "../components/ExpenseCharts";
import { BackButton } from "../components/BackButton/BackButton";

import s from "./page.module.scss";

export default function page() {
  return (
    <div className={s.page}>
      <div className={s.page__container}>
        <BackButton />
        <BudgetOverviewMore />
      </div>
      <ExpenseChartsServer />
    </div>
  );
}
