import Image from "next/image";

import s from "./BudgetCard.module.scss";

type TBudgetCardProps = {
  image: string;
  budget?: number;
  className: string;
  title?: string;
};

export const BudgetCard = ({ image, budget, className, title }: TBudgetCardProps) => {
  return (
    <div className={`${s.budgetCard} ${s[className]}`}>
      <div className={s.budgetCard__icon}>
        <Image src={image} width={40} height={40} alt="Total" />
      </div>
      <div className={s.budgetCard__content}>
        <p className={s.budgetCard__amount}>{budget?.toLocaleString()} ₽</p>
        <span className={s.budgetCard__label}>{title}</span>
      </div>
    </div>
  );
};
