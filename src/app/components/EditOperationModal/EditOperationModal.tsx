"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { OperationButton } from "./OperationButton";
import { FormField } from "../FormField";
import { CategoryItem } from "./CategoryItem";
import { Button } from "@/app/ui/components/Button";

import { useEditModalStore } from "../../../../stores/modalStore";
import { expenseIcons, incomeIcons } from "@/app/mockData";

import { updateTransactionAction } from "@/app/actions/transactions";
import s from "./EditOperationModal.module.scss";

export const EditOperationModal = () => {
  const { isEditOperationOpen, closeModal, selectedTransaction } = useEditModalStore();

  const [operationType, setOperationType] = useState<"expense" | "income">("expense");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (selectedTransaction) {
      setOperationType(selectedTransaction.type);
      setTitle(selectedTransaction.title);
      setCategory(selectedTransaction.category);
      setAmount(selectedTransaction.amount);
    }
  }, [selectedTransaction]);

  const handleUpdateTransaction = async () => {
    if (!selectedTransaction) return;

    await updateTransactionAction(selectedTransaction.id, {
      title: title,
      category: category,
      amount: amount,
      type: operationType,
      description: description,
    });

    closeModal();
  };

  useEffect(() => {
    if (isEditOperationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isEditOperationOpen]);

  return (
    <>
      {isEditOperationOpen && (
        <div className={s.editOperationModal__container}>
          <div className={s.editOperationModal__content}>
            <div>
              <div className={s.editOperationModal__header}>
                <div>
                  <h2>Редактировать операцию</h2>
                  <p>Измените ваши доходы и расходы</p>
                </div>
                <Image src="cross.svg" alt="Exit" width={24} height={24} onClick={closeModal} className={s.editOperationModal__closeButton} />
              </div>

              <form>
                <div className={selectedTransaction?.type === "expense" ? s.editOperationModal__expense : s.editOperationModal__income}>
                  {selectedTransaction?.type === "expense" ? "Расход" : "Доход"}
                </div>

                <div className={s.editOperationModal__form}>
                  <FormField label="Заголовок" type="text" required placeholder="Например: Продукты в магазине" className={s.editOperationModal__inputField} value={title} setValue={setTitle} />

                  <FormField
                    label="Описание"
                    value={description}
                    className={s.editOperationModal__inputField}
                    setValue={setDescription}
                    placeholder="Дополнительная информация об операции..."
                    textarea
                    rows={2}
                  />

                  <FormField label="Сумма" required type="text" value={amount} setValue={(val: string) => setAmount(Number(val))} placeholder="0.00" className={s.editOperationModal__inputField} />
                </div>
              </form>
            </div>

            <div className={s.editOperationModal__modalFooter}>
              <Button className={s.editOperationModal__cancelButton} onClick={closeModal}>
                Отмена
              </Button>
              <Button
                className={`${s.editOperationModal__submitButton} ${!title || !amount || !category ? s.disabled : operationType === "income" ? s.income : s.expense}`}
                onClick={handleUpdateTransaction}
                disabled={!title || !amount}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
