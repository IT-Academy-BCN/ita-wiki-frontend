import { useState } from "react";
import type { TypModalKey } from "../types";

export interface ModalState {
  modals: Record<TypModalKey, boolean>;
  isAnyModalOpen: boolean;
  toggleModal: (modal: TypModalKey) => void;
  closeModal: (modal: TypModalKey) => void;
  openModal: (modal: TypModalKey) => void;
  isModalOpen: (modal: TypModalKey) => boolean;
}

export const useModals = () => {
  const [modals, setModals] = useState({
    addUser: false,
    addResource: false,
    access: false,
  });

  const openModal = (modal: TypModalKey) => {
    setModals((prev) => ({ ...prev, [modal]: true }));
  };

  const closeModal = (modal: TypModalKey) => {
    setModals((prev) => ({ ...prev, [modal]: false }));
  };

  const toggleModal = (modal: TypModalKey) => {
    setModals((prev) => ({ ...prev, [modal]: !prev[modal] }));
  };

  const isModalOpen = (modal: TypModalKey) => {
    return modals[modal];
  };

  const isAnyModalOpen = Object.values(modals).some((modal) => modal);

  return {
    modals,
    isAnyModalOpen,
    toggleModal,
    closeModal,
    openModal,
    isModalOpen,
  } as ModalState;
};
