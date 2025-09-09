import s from "./OperationButton.module.scss";

type TOperationButtonProps = {
  type: "expense" | "income";
  isActive: boolean;
  onClick: () => void;
};

export const OperationButton = ({ type, isActive, onClick }: TOperationButtonProps) => {
  const labels = {
    expense: "Расход",
    income: "Доход",
  };

  return (
    <button type="button" onClick={onClick} className={`${s.operationButton__toggleButton} ${isActive ? (type === "expense" ? s.activeExpense : s.activeIncome) : s.inactive}`}>
      {labels[type]}
    </button>
  );
};
