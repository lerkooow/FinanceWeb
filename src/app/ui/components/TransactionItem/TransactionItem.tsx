import s from "./TransactionItem.module.scss";

type TTransactionItemProps = {
  id: number;
  type: "expense" | "income";
  icon: React.ReactNode;
  title: string;
  category: string;
  date: Date;
  amount: number;
  formatDate: (date: Date) => string;
  formatAmount: (amount: number) => string;
};

export const TransactionItem = ({ id, type, icon, title, category, date, amount, formatDate, formatAmount }: TTransactionItemProps) => {
  return (
    <div key={id} className={`${s.transactionItem} ${type === "expense" ? s["transactionItem--expense"] : s["transactionItem--income"]}`}>
      <div className={s.transactionItem__transactionContent}>
        <div className={s.transactionItem__transactionInfo}>
          <div className={s.transactionItem__transactionIcon}>{icon}</div>
          <div>
            <h4 className={s.transactionItem__transactionTitle}>{title}</h4>
            <p className={s.transactionItem__transactionCategory}>{category}</p>
          </div>
        </div>
        <div className={s.transactionItem__transactionDate}>{formatDate(date)}</div>
      </div>
      <div className={`${s.transactionItem__transactionAmount} ${type === "expense" ? s["transactionItem__transactionAmount--expense"] : s["transactionItem__transactionAmount--income"]}`}>
        {formatAmount(amount)}
      </div>
    </div>
  );
};
