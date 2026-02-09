"use server";

import { BudgetCard } from "@/app/ui/components/BudgetCard";
import { ProgressSection } from "@/app/ui/components/ProgressSection";
import { BlockHeader } from "@/app/ui/components/BlockHeader/BlockHeader";

import s from "./BudgetOverview.module.scss";
import { getBudgetOverview } from "./hooks/useBudgetOverview";

export const BudgetOverview = async () => {
  const { cards, formatted, dailyBudget, progress, notice } = await getBudgetOverview();

  return (
    <div className={s.budgetOverview}>
      <BlockHeader title="Обзор бюджета" subtitle={`Финансовые показатели на ${formatted}`} arrow />

      <div className={s.budgetOverview__cards}>
        {cards.map((card) => (
          <BudgetCard key={card.title} {...card} />
        ))}
      </div>
      {notice}
      <div className={s.budgetOverview__bottom}>
        <div className={s.budgetOverview__dailyBudget}>Ваш бюджет на день: {dailyBudget} ₽</div>
        <ProgressSection progress={progress} title="Использование бюджета" />
      </div>
    </div>
  );
};
