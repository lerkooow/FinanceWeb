import { Notice } from "@/app/ui/components/Notice";
import { BudgetCard } from "@/app/ui/components/BudgetCard";
import { ProgressSection } from "@/app/ui/components/ProgressSection";
import { BlockHeader } from "@/app/ui/components/BlockHeader/BlockHeader";

import { useBudgetOverview } from "./hooks/useBudgetOverview";

import s from "./BudgetOverview.module.scss";

export const BudgetOverview = async () => {
  const { formatted, income, noticeError, dailyBudget, available, progress, expenses } = await useBudgetOverview();

  return (
    <div className={s.budgetOverview}>
      <BlockHeader title="Обзор бюджета" subtitle={`Финансовые показатели на ${formatted}`} />

      <div className={s.budgetOverview__cards}>
        <BudgetCard image="/total.svg" budget={income} className="budgetCard--total" title="Общий бюджет" />
        <BudgetCard image="/spent.svg" budget={expenses} className="budgetCard--spent" title="Потрачено" />
        <BudgetCard image="/remaining.svg" budget={available > 0 ? available : 0} className="budgetCard--remaining" title="Доступно" />
      </div>

      <div className={s.budgetOverview__dailyBudget}>Ваш бюджет на день: {dailyBudget} ₽</div>

      {income === 0 && <Notice description="Вы ещё не добавили бюджет. Укажите сумму дохода, чтобы начать отслеживать расходы" />}
      {noticeError && !(income === 0) && <Notice description="Ваши расходы превысили установленный бюджет. Проверьте траты и скорректируйте план" type="error" />}
      {progress > 81 && !noticeError && <Notice description="Вы израсходовали более 80% бюджета. Будьте внимательнее с оставшимися средствами" type="warning" />}

      <ProgressSection progress={progress} title="Использование бюджета" />
    </div>
  );
};
