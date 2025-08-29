import { BudgetCard } from "@/app/ui/components/BudgetCard";
import { ProgressSection } from "@/app/ui/components/ProgressSection";

import { progress, remaining, spent, total } from "@/app/mockData";

import s from "./BudgetOverview.module.scss";
import { db } from "../../../../db";
import { UserTable } from "../../../../db/schema";

export const BudgetOverview = async () => {
  const users = await db.select().from(UserTable);
  console.log("🚀 ~ BudgetOverview ~ users:", users);

  return (
    <div className={s.budgetOverview}>
      <div>
        <h2 className={s.budgetTitle}>Обзор бюджета</h2>
        <p className={s.budgetSubtitle}>Мониторинг финансовых показателей в реальном времени</p>
      </div>

      <div className={s.budgetCards}>
        <BudgetCard image="/total.svg" budget={total} className="budgetCard--total" title="Общий бюджет" />
        <BudgetCard image="/spent.svg" budget={spent} className="budgetCard--spent" title="Потрачено" />
        <BudgetCard image="/remaining.svg" budget={remaining} className="budgetCard--remaining" title="Доступно" />
      </div>

      <ProgressSection progress={progress} title="Использование бюджета" />
    </div>
  );
};
