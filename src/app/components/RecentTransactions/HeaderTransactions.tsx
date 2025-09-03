"use client";
import { useModalStore } from "../../../../stores/modalStore";

import { Button } from "@/app/ui/components/Button";

import s from "./RecentTransactions.module.scss";

export const HeaderTransactions = () => {
  const { openModal } = useModalStore();

  return (
    <div className={s.recentTransactions__header}>
      <div className={s.recentTransactions__headerContent}>
        <h2 className={s.recentTransactions__title}>Последние операции</h2>
        <p className={s.recentTransactions__subtitle}>Ваши недавние доходы и расходы</p>
      </div>
      <Button className={s.recentTransactions__primary} icon="/plus.svg" onClick={openModal}>
        Добавить операцию
      </Button>
    </div>
  );
};
