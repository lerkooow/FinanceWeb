import { ProgressSection } from "@/app/ui/components/ProgressSection";
import { BlockHeader } from "@/app/ui/components/BlockHeader/BlockHeader";
import { useBudgetOverview } from "@/app/components/BudgetOverview/hooks/useBudgetOverview";

import s from "./BudgetOverviewMore.module.scss";

export const BudgetOverviewMore = async () => {
  const { dailyBudget, progress } = await useBudgetOverview();

  return (
    <div className={s.budgetOverviewMore}>
      <BlockHeader title="Обзор бюджета" subtitle={`Финансовые показатели`} />
      <div className={s.budgetOverviewMore__dailyBudget}>Ваш бюджет на день: {dailyBudget} ₽</div>
      <ProgressSection progress={progress} title="Использование бюджета" />
    </div>
  );
};
