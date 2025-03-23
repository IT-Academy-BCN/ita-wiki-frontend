import { useState } from "react";

export interface AccessModalProps {
  isAccesssModal: boolean;
  openAccessModal: () => void;
  closeAccessModal: () => void;
  toggleAccessModal: () => void;
}

export const useAccessModal = () => {
  const [isAccesssModal, setIsAccesssModal] = useState(false);
  const openAccessModal = () => setIsAccesssModal(() => true);
  const closeAccessModal = () => setIsAccesssModal(() => false);
  const toggleAccessModal = () => setIsAccesssModal(() => false);

  return {
    isAccesssModal,
    openAccessModal,
    closeAccessModal,
    toggleAccessModal,
  } as AccessModalProps;
};
