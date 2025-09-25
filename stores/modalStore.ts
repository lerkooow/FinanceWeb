import { create } from "zustand";
import { persist } from "zustand/middleware";

type TTransaction = {
  id: number;
  type: "expense" | "income";
  icon: string;
  title: string;
  category: string;
  date: Date;
  amount: number;
};

interface ModalState {
  isAddOperationOpen: boolean;
  openAddModal: () => void;
  closeAddModal: () => void;
  toggleAddModal: () => void;

  isEditOperationOpen: boolean;
  openEditModal: () => void;
  closeEditModal: () => void;
  toggleEditModal: () => void;

  isTransactionOpen: boolean;
  openTransactionModal: () => void;
  closeTransactionModal: () => void;
  toggleTransactionModal: () => void;

  type: "edit" | "add";
  setType: (type: "edit" | "add") => void;
  selectedTransaction: TTransaction | null;
  setSelectedTransaction: (transaction: TTransaction) => void;
}

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      isAddOperationOpen: false,
      openAddModal: () => set({ isAddOperationOpen: true }),
      closeAddModal: () => set({ isAddOperationOpen: false }),
      toggleAddModal: () => set((state) => ({ isAddOperationOpen: !state.isAddOperationOpen })),

      isEditOperationOpen: false,
      openEditModal: () => set({ isEditOperationOpen: true }),
      closeEditModal: () => set({ isEditOperationOpen: false }),
      toggleEditModal: () => set((state) => ({ isEditOperationOpen: !state.isEditOperationOpen })),

      isTransactionOpen: false,
      openTransactionModal: () => set({ isTransactionOpen: true }),
      closeTransactionModal: () => set({ isTransactionOpen: false }),
      toggleTransactionModal: () => set((state) => ({ isTransactionOpen: !state.isTransactionOpen })),

      type: "add",
      setType: (type: "edit" | "add") => set({ type }),
      selectedTransaction: null,
      setSelectedTransaction: (transaction: TTransaction) => set({ selectedTransaction: transaction }),
    }),
    {
      name: "modal-storage",
    }
  )
);
