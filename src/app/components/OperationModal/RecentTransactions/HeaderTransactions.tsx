"use client";
import { Calendar } from "@heroui/calendar";
import { parseDate } from "@internationalized/date";

import { Button } from "@/app/ui/components/Button";

import { useModalStore } from "../../../../../stores/modalStore";

import s from "./RecentTransactionsList/RecentTransactionsList.module.scss";

export const HeaderTransactions = () => {
  const { openAddModal, setType } = useModalStore();
  const handleClick = () => {
    openAddModal();
    setType("add");
  };

  return (
    <div className={s.recentTransactions__header}>
      <div className={s.recentTransactions__headerContent}>
        <h2 className={s.recentTransactions__title}>Последние операции</h2>
        <p className={s.recentTransactions__subtitle}>Ваши недавние доходы и расходы</p>
      </div>

      <Calendar aria-label="Date (Uncontrolled)" defaultValue={parseDate("2020-02-03")} />

      <Button className={s.recentTransactions__primary} icon="/plus.svg" onClick={handleClick}>
        Добавить операцию
      </Button>
    </div>
  );
};
