import { useEffect, useState } from "react";

import { useModalStore } from "../../../../../stores/modalStore";

import { addTransactionAction } from "@/app/actions/transactions";

export const useOperationModal = () => {
  const { isAddOperationOpen, closeModal } = useModalStore();

  const [operationType, setOperationType] = useState<"expense" | "income">("expense");
  const [selectedIcon, setSelectedIcon] = useState("DollarSign");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");

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
    if (isAddOperationOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isAddOperationOpen]);
};
