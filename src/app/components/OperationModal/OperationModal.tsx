"use client";

import Image from "next/image";

import { OperationButton } from "./OperationButton";
import { FormField } from "../../ui/components/FormField";
import { CategoryItem } from "./CategoryItem";
import { Button } from "@/app/ui/components/Button";

import { useOperationModal } from "./hooks/useOperationModal";

import { expenseIcons, incomeIcons } from "@/app/mockData";

import s from "./OperationModal.module.scss";

type TOperationModalProps = {
  type: "add" | "edit";
};

export const OperationModal = ({ type }: TOperationModalProps) => {
  const {
    open,
    disabled,
    operationType,
    selectedIcon,
    title,
    description,
    amount,
    category,
    selectedTransaction,
    setOperationType,
    setSelectedIcon,
    setTitle,
    setDescription,
    setAmount,
    setCategory,
    handleAddTransaction,
    handleEditTransaction,
    closeAddModal,
    closeEditModal,
  } = useOperationModal({ type });
  console.log("🚀 ~ OperationModal ~ disabled:", disabled);
  console.log("🚀 ~ OperationModal ~ category:", category);

  return (
    <>
      {open && (
        <div className={s.operationModal__container}>
          <div className={s.operationModal__content}>
            <div>
              <div className={s.operationModal__header}>
                <div>
                  <h2>Добавить операцию</h2>
                  <p>Добавление ваших доходов и расходов</p>
                </div>
                <Image src="cross.svg" alt="Exit" width={24} height={24} onClick={type === "add" ? closeAddModal : closeEditModal} className={s.operationModal__closeButton} />
              </div>

              <form>
                {type === "add" ? (
                  <div className={s.operationModal__operationToggle}>
                    {["expense", "income"].map((type) => (
                      <OperationButton
                        key={type}
                        type={type as "expense" | "income"}
                        isActive={operationType === type}
                        onClick={() => {
                          setOperationType(type as "expense" | "income");
                          setSelectedIcon(type === "expense" ? "GROCERY" : "DOLLAR");
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={selectedTransaction?.type === "expense" ? s.operationModal__expense : s.operationModal__income}>{selectedTransaction?.type === "expense" ? "Расход" : "Доход"}</div>
                )}
                {type === "add" && (
                  <>
                    <p>
                      Выберите категорию <span className={s.operationModal__inputRequired}>*</span>
                    </p>
                    <CategoryItem
                      operationType={operationType}
                      selectedIcon={selectedIcon}
                      incomeIcons={incomeIcons}
                      expenseIcons={expenseIcons}
                      setSelectedIcon={setSelectedIcon}
                      setCategory={setCategory}
                    />
                  </>
                )}
                <div className={s.operationModal__form}>
                  <FormField label="Заголовок" type="text" required placeholder="Например: Продукты в магазине" className={s.operationModal__inputField} value={title} setValue={setTitle} />

                  <FormField
                    label="Описание"
                    value={description}
                    className={s.operationModal__inputField}
                    setValue={setDescription}
                    placeholder="Дополнительная информация об операции..."
                    textarea
                    rows={2}
                  />

                  <FormField
                    label="Сумма"
                    required
                    type="text"
                    value={amount}
                    setValue={(val: string) => {
                      if ((val.replace(/^0+/, "") || "0") === "") return;

                      const num = Number(val.replace(/^0+/, "") || "0");
                      if (!isNaN(num)) setAmount(num);
                    }}
                    placeholder="0.00"
                    className={s.operationModal__inputField}
                  />
                </div>
              </form>
            </div>

            <div className={s.operationModal__modalFooter}>
              <Button className={s.operationModal__cancelButton} onClick={type === "add" ? closeAddModal : closeEditModal}>
                Отмена
              </Button>
              <Button
                className={`${s.operationModal__submitButton} ${!title || !amount || !category ? s.disabled : operationType === "income" ? s.income : s.expense}`}
                onClick={type === "add" ? handleAddTransaction : handleEditTransaction}
                disabled={disabled}
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
