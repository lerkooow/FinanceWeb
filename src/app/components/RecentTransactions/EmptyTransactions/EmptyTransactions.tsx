import s from "./EmptyTransactions.module.scss";

export const EmptyTransactions = () => {
  return (
    <div className={s.emptyTransactions__emptyState}>
      <div className={s.emptyTransactions__emptyIcon}>📊</div>
      <div className={s.emptyTransactions__emptyText}>Нет операций</div>
      <div className={s.emptyTransactions__emptySubtext}>Добавьте первую операцию, чтобы начать отслеживание расходов</div>
    </div>
  );
};
