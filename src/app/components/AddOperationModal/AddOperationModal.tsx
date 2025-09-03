"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { useUser } from "@clerk/nextjs";

import { OperationButton } from "./OperationButton";
import { FormField } from "../FormField";
import { CategoryItem } from "./CategoryItem";
import { Button } from "@/app/ui/components/Button";

import { useModalStore } from "../../../../stores/modalStore";
import { expenseIcons, incomeIcons } from "@/app/mockData";

import s from "./AddOperationModal.module.scss";

export const AddOperationModal = () => {
  const { isAddOperationOpen, closeModal } = useModalStore();
  const { user } = useUser();

  const [operationType, setOperationType] = useState<"expense" | "income">("expense");
  const [selectedIcon, setSelectedIcon] = useState("DollarSign");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const addExpenseTransaction = async (data: { title: string; category: string; amount: number; type: "income" | "expense"; icon?: string; date?: string; description?: string }) => {
    try {
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          date: data.date || new Date().toISOString(),
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Ошибка при добавлении расходов");
      }

      const json = await res.json();
      console.log("Расходы добавлена:", json.transaction);

      window.location.reload();

      return json.transaction;
    } catch (err) {
      console.error(err);
      alert("Ошибка при добавлении расходов");
    }
  };

  const handleAddExpense = () => {
    addExpenseTransaction({
      title: title,
      category: category,
      amount: amount,
      type: operationType,
      icon: selectedIcon,
      description: description,
    });

    closeModal();
  };

  const handleAddIncome = async () => {
    if (!user?.id) {
      alert("Пользователь не авторизован");
      return;
    }

    await addExpenseTransaction({
      title: title,
      category: category,
      amount: amount,
      type: operationType,
      icon: selectedIcon,
      description: description,
    });

    closeModal();
  };

  useEffect(() => {
    if (isAddOperationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isAddOperationOpen]);

  return (
    <>
      {isAddOperationOpen && (
        <div className={s.addOperationModal__container}>
          <div className={s.addOperationModal__content}>
            <div>
              <div className={s.addOperationModal__header}>
                <div>
                  <h2>Добавить операцию</h2>
                  <p>Добавление ваших доходов и расходов</p>
                </div>
                <Image src="cross.svg" alt="Exit" width={24} height={24} onClick={closeModal} className={s.addOperationModal__closeButton} />
              </div>

              <form>
                <div className={s.addOperationModal__operationToggle}>
                  {["expense", "income"].map((type) => (
                    <OperationButton
                      key={type}
                      type={type as "expense" | "income"}
                      isActive={operationType === type}
                      onClick={() => {
                        setOperationType(type as "expense" | "income");
                        setSelectedIcon(type === "expense" ? "ShoppingCart" : "DollarSign");
                      }}
                    />
                  ))}
                </div>
                <p>
                  Выберите категорию <span className={s.addOperationModal__inputRequired}>*</span>
                </p>
                <CategoryItem
                  operationType={operationType}
                  selectedIcon={selectedIcon}
                  incomeIcons={incomeIcons}
                  expenseIcons={expenseIcons}
                  setSelectedIcon={setSelectedIcon}
                  setCategory={setCategory}
                />
                <div className={s.addOperationModal__form}>
                  <FormField label="Заголовок" type="text" required placeholder="Например: Продукты в магазине" className={s.addOperationModal__inputField} value={title} setValue={setTitle} />

                  <FormField
                    label="Описание"
                    value={description}
                    className={s.addOperationModal__inputField}
                    setValue={setDescription}
                    placeholder="Дополнительная информация об операции..."
                    textarea
                    rows={2}
                  />

                  <FormField label="Сумма" required type="text" value={amount} setValue={(val: string) => setAmount(Number(val))} placeholder="0.00" className={s.addOperationModal__inputField} />
                </div>
              </form>
            </div>

            <div className={s.addOperationModal__modalFooter}>
              <Button className={s.addOperationModal__cancelButton} onClick={closeModal}>
                Отмена
              </Button>
              <Button
                className={`${s.addOperationModal__submitButton} ${!title || !amount || !category ? s.disabled : operationType === "income" ? s.income : s.expense}`}
                onClick={operationType === "income" ? handleAddIncome : handleAddExpense}
                disabled={!title || !amount}
              >
                {operationType === "income" ? "Добавить доход" : "Добавить расход"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
