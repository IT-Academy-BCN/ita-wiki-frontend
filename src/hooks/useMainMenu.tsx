import { useState } from "react";

export interface IntUseMainMenu {
  isOpenMainMenu: boolean;
  toggleMainMenu: () => void;
  openMainMenu: () => void;
  closeMainMenu: () => void;
}

export const useMainMenu = (): IntUseMainMenu => {
  const [isOpenMainMenu, setIsOpenMainMenu] = useState<boolean>(false);

  const toggleMainMenu = () => {
    setIsOpenMainMenu((prevState) => !prevState);
  };

  const openMainMenu = () => {
    setIsOpenMainMenu(true);
  };

  const closeMainMenu = () => {
    setIsOpenMainMenu(false);
  };

  return { isOpenMainMenu, toggleMainMenu, openMainMenu, closeMainMenu };
};
