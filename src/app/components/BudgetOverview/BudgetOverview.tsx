import { BudgetCard } from "@/app/ui/components/BudgetCard";
import { ProgressSection } from "@/app/ui/components/ProgressSection";
import { BlockHeader } from "@/app/ui/components/BlockHeader/BlockHeader";

import { useBudgetOverview } from "./hooks/useBudgetOverview";

import s from "./BudgetOverview.module.scss";

export const BudgetOverview = async () => {
  const { cards, formatted, dailyBudget, progress, renderNotice } = await useBudgetOverview();

  return (
    <div className={s.budgetOverview}>
      <BlockHeader title="Обзор бюджета" subtitle={`Финансовые показатели на ${formatted}`} arrow />

      <div className={s.budgetOverview__cards}>
        {cards.map((card) => (
          <BudgetCard key={card.title} {...card} />
        ))}
      </div>
      {renderNotice()}
      <div className={s.budgetOverview__bottom}>
        <div className={s.budgetOverview__dailyBudget}>Ваш бюджет на день: {dailyBudget} ₽</div>
        <ProgressSection progress={progress} title="Использование бюджета" />
      </div>
    </div>
  );
};
