"use client";

import { OperationModal } from "../OperationModal";

import { useModalStore } from "../../../../../stores/modalStore";

export const OperationModalWrapper = () => {
  const { type } = useModalStore();

  return <OperationModal type={type} />;
};
