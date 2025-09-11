import { Notice } from "@/app/ui/components/Notice";
import { BudgetCard } from "@/app/ui/components/BudgetCard";
import { ProgressSection } from "@/app/ui/components/ProgressSection";

import { useBudgetOverview } from "./hooks/useBudgetOverview";

import s from "./BudgetOverview.module.scss";

export const BudgetOverview = async () => {
  const { formatted, income, available, progress, expenses } = await useBudgetOverview();

  return (
    <div className={s.budgetOverview}>
      <div>
        <h2 className={s.budgetTitle}>Обзор бюджета</h2>
        <p className={s.budgetSubtitle}>Финансовые показатели на {formatted}</p>
      </div>

      <div className={s.budgetCards}>
        <BudgetCard image="/total.svg" budget={income} className="budgetCard--total" title="Общий бюджет" />
        <BudgetCard image="/spent.svg" budget={expenses} className="budgetCard--spent" title="Потрачено" />
        <BudgetCard image="/remaining.svg" budget={available} className="budgetCard--remaining" title="Доступно" />
      </div>

      {progress > 81 && <Notice description={`Внимание: расходы превысили 80% от дохода`} icon="warning.svg" />}

      <ProgressSection progress={progress} title="Использование бюджета" />
    </div>
  );
};
