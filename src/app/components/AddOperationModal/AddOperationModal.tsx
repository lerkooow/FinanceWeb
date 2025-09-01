import { TransactionActions } from "../RecentTransactions/TransactionActions";
import s from "./AddOperationModal.module.scss";

export const AddOperationModal = () => {
  return (
    <div className={s.addOperationModal}>
      <div className={s.addOperationModal__header}>
        <div className={s.addOperationModal__headerContent}>
          <h2 className={s.addOperationModal__title}>Добавить операцию</h2>
          <p className={s.addOperationModal__subtitle}>Добавление ваших доходов и расходов</p>
        </div>
        <TransactionActions />
      </div>
    </div>
  );
};
