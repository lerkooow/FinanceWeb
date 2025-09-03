import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModalState {
  isAddOperationOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
}

export const useModalStore = create<ModalState>()(
  persist(
    (set) => ({
      isAddOperationOpen: false,
      openModal: () => set({ isAddOperationOpen: true }),
      closeModal: () => set({ isAddOperationOpen: false }),
      toggleModal: () => set((state) => ({ isAddOperationOpen: !state.isAddOperationOpen })),
    }),
    {
      name: "modal-storage",
    }
  )
);

type TTransaction = {
  id: number;
  type: "expense" | "income";
  icon: string;
  title: string;
  category: string;
  date: Date;
  amount: number;
};

interface EditModalState {
  isEditOperationOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  toggleModal: () => void;
  selectedTransaction: TTransaction | null;
  setSelectedTransaction: (transaction: TTransaction) => void;
}

export const useEditModalStore = create<EditModalState>()((set) => ({
  isEditOperationOpen: false,
  openModal: () => set({ isEditOperationOpen: true }),
  closeModal: () => set({ isEditOperationOpen: false }),
  toggleModal: () => set((state) => ({ isEditOperationOpen: !state.isEditOperationOpen })),
  selectedTransaction: null,
  setSelectedTransaction: (transaction: TTransaction) => set({ selectedTransaction: transaction }),
}));
