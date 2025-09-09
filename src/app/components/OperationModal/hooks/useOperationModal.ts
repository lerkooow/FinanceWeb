"use client";

import { useEffect, useState } from "react";

import { useModalStore } from "../../../../../stores/modalStore";

import { addTransactionAction, updateTransactionAction } from "@/app/actions/transactions";

export const useOperationModal = () => {
  const { isAddOperationOpen, isEditOperationOpen, selectedTransaction, closeAddModal, closeEditModal } = useModalStore();

  const [operationType, setOperationType] = useState<"expense" | "income">("expense");
  const [selectedIcon, setSelectedIcon] = useState("DollarSign");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

  const resetForm = () => {
    setOperationType("expense");
    setSelectedIcon("DollarSign");
    setTitle("");
    setDescription("");
    setAmount(0);
    setCategory("");
  };

  const handleAddTransaction = () => {
    addTransactionAction({
      title: title,
      category: category,
      amount: amount,
      type: operationType,
      icon: selectedIcon,
      description: description,
    });

    closeAddModal();
    resetForm();
  };

  useEffect(() => {
    if (isAddOperationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isAddOperationOpen]);

  useEffect(() => {
    if (selectedTransaction) {
      setOperationType(selectedTransaction.type);
      setTitle(selectedTransaction.title);
      setCategory(selectedTransaction.category);
      setAmount(selectedTransaction.amount);
    }
  }, [selectedTransaction]);

  const handleEditTransaction = async () => {
    if (!selectedTransaction) return;

    await updateTransactionAction(selectedTransaction.id, {
      title: title,
      category: category,
      amount: amount,
      type: operationType,
      description: description,
    });

    closeEditModal();
  };

  return {
    title,
    amount,
    category,
    description,
    isAddOperationOpen,
    isEditOperationOpen,
    operationType,
    selectedIcon,
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
  };
};
