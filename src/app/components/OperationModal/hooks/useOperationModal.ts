"use client";

import { useEffect, useState } from "react";

import { useModalStore } from "../../../../../stores/modalStore";
import { addTransactionAction, updateTransactionAction } from "@/app/api/actions/transactions";

type TUseOperationModalProps = {
  type: "add" | "edit";
};

export const useOperationModal = ({ type }: TUseOperationModalProps) => {
  const { isAddOperationOpen, isEditOperationOpen, selectedTransaction, closeAddModal, closeEditModal } = useModalStore();

  const [operationType, setOperationType] = useState<"expense" | "income">("expense");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const open = type === "add" ? isAddOperationOpen : isEditOperationOpen;
  const disabled = type === "add" ? !amount || !category : !amount;

  const resetForm = () => {
    setOperationType("expense");
    setSelectedIcon("");
    setDescription("");
    setAmount(0);
    setCategory("");
  };

  const handleAddTransaction = async () => {
    try {
      const result = await addTransactionAction({
        title: description,
        category: category,
        amount: amount,
        type: operationType,
        icon: selectedIcon,
        description: description,
      });

      if (result) {
        resetForm();
        closeAddModal();
      } else {
        console.error("Не удалось добавить транзакцию");
      }
    } catch (error) {
      console.error("Ошибка при добавлении транзакции:", error);
    }
  };

  useEffect(() => {
    if (isAddOperationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isAddOperationOpen]);

  useEffect(() => {
    if (isEditOperationOpen && selectedTransaction) {
      setOperationType(selectedTransaction.type);
      setCategory(selectedTransaction.category);
      setAmount(selectedTransaction.amount);
    }
  }, [isEditOperationOpen, selectedTransaction]);

  const handleEditTransaction = async () => {
    if (!selectedTransaction) return;

    try {
      const result = await updateTransactionAction(selectedTransaction.id, {
        title: description,
        category: category,
        amount: amount,
        type: operationType,
        description: description,
      });

      if (result) {
        resetForm();
        closeEditModal();
      } else {
        console.error("Не удалось обновить транзакцию");
      }
    } catch (error) {
      console.error("Ошибка при обновлении транзакции:", error);
    }
  };

  return {
    open,
    disabled,
    amount,
    category,
    description,
    operationType,
    selectedIcon,
    selectedTransaction,
    setOperationType,
    setSelectedIcon,
    setDescription,
    setAmount,
    setCategory,
    handleAddTransaction,
    handleEditTransaction,
    closeAddModal,
    closeEditModal,
    resetForm,
  };
};
