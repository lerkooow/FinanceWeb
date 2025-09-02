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
