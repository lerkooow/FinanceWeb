import { useModalStore } from "../../../../stores/modalStore";

import s from "./RecentTransactionsModal.module.scss";

export const RecentTransactionsModal = () => {
  const { isTransactionOpen } = useModalStore();
  return isTransactionOpen ? (
    <div className={s.recentTransactionsModal__container}>
      <div className={s.operationModal__content}>fefefefef</div>
    </div>
  ) : null;
};
