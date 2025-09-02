import { DollarSign } from "lucide-react";
import s from "./CategoryItem.module.scss";
import { TIcons } from "@/app/mockData";

type TCategoryItemProps = {
  operationType: "income" | "expense";
  selectedIcon: string;
  incomeIcons: TIcons[];
  expenseIcons: TIcons[];
  setSelectedIcon: (item: string) => void;
  setCategory: (item: string) => void;
};

export const CategoryItem = ({ operationType, selectedIcon, incomeIcons, expenseIcons, setSelectedIcon, setCategory }: TCategoryItemProps) => {
  const renderIcon = (iconName: string) => {
    const IconComponent = [...incomeIcons, ...expenseIcons].find((item) => item.name === iconName)?.icon || DollarSign;
    return <IconComponent size={24} />;
  };

  const currentIcons = operationType === "income" ? incomeIcons : expenseIcons;

  return (
    <div className={s.categoryItem__iconGrid}>
      {currentIcons.map((iconItem) => (
        <button
          key={iconItem.name}
          type="button"
          onClick={() => {
            setSelectedIcon(iconItem.name);
            setCategory(iconItem.label);
          }}
          className={`${s.categoryItem__iconButton} ${selectedIcon === iconItem.name ? (operationType === "income" ? s.selectedIncome : s.selectedExpense) : ""}`}
        >
          {renderIcon(iconItem.name)}
          <span>{iconItem.label}</span>
        </button>
      ))}
    </div>
  );
};
