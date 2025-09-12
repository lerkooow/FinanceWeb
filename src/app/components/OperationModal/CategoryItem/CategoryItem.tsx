import { categoryIcons, TIcons } from "@/app/mockData";

import s from "./CategoryItem.module.scss";

type TCategoryItemProps = {
  operationType: "income" | "expense";
  selectedIcon: string;
  incomeIcons: TIcons[];
  expenseIcons: TIcons[];
  setSelectedIcon: (item: string) => void;
  setCategory: (item: string) => void;
};

export const CategoryItem = ({ operationType, selectedIcon, incomeIcons, expenseIcons, setSelectedIcon, setCategory }: TCategoryItemProps) => {
  const currentIcons = operationType === "income" ? incomeIcons : expenseIcons;

  return (
    <div className={s.categoryItem__iconGrid}>
      {currentIcons.map((iconItem) => {
        const IconComponent = categoryIcons[iconItem.name as keyof typeof categoryIcons];

        return (
          <button
            key={iconItem.name}
            type="button"
            onClick={() => {
              setSelectedIcon(iconItem.name);
              setCategory(iconItem.label);
            }}
            className={`${s.categoryItem__iconButton} ${selectedIcon === iconItem.name ? (operationType === "income" ? s.selectedIncome : s.selectedExpense) : ""}`}
          >
            <IconComponent className={s.categoryItem__icon} width={24} height={24} />
            <span>{iconItem.label}</span>
          </button>
        );
      })}
    </div>
  );
};
