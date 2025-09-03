"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import { FormField } from "../FormField";
import { Button } from "@/app/ui/components/Button";

import { useEditModalStore } from "../../../../stores/modalStore";

import { addTransactionAction } from "@/app/actions/transactions";
import s from "./EditOperationModal.module.scss";

export const EditOperationModal = () => {
  const { isEditOperationOpen, closeModal, selectedTransaction } = useEditModalStore();
  console.log("🚀 ~ EditOperationModal ~ isEditOperationOpen:", isEditOperationOpen);

  const [operationType, setOperationType] = useState<"expense" | "income">("expense");
  const [selectedIcon, setSelectedIcon] = useState("DollarSign");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (selectedTransaction) {
      setOperationType(selectedTransaction.type);
      setSelectedIcon(selectedTransaction.icon);
      setTitle(selectedTransaction.title);
      setCategory(selectedTransaction.category);
      setAmount(selectedTransaction.amount);
    }
  }, [selectedTransaction]);

  const handleAddTransaction = () => {
    addTransactionAction({
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
    if (isEditOperationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isEditOperationOpen]);

  const type = "expense";

  return (
    <>
      {isEditOperationOpen && (
        <div className={s.addOperationModal__container}>
          <div className={s.addOperationModal__content}>
            <div>
              <div className={s.addOperationModal__header}>
                <div>
                  <h2>Редактировать операцию</h2>
                  <p>Измените ваши доходы и расходы</p>
                </div>
                <Image src="cross.svg" alt="Exit" width={24} height={24} onClick={closeModal} className={s.addOperationModal__closeButton} />
              </div>

              <form>
                <div className={type === "expense" ? s.addOperationModal__expense : s.addOperationModal__income}>{type === "expense" ? "Расход" : "Доход"}</div>

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
                onClick={handleAddTransaction}
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
