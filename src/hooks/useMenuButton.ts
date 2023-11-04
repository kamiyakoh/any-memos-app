import { useState } from 'react';

interface UseMenuButton {
  isOpenMenu: boolean;
  openMenu: () => void;
  closeMenu: () => void;
}

export const useMenuButton = (): UseMenuButton => {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  const openMenu = (): void => {
    setIsOpenMenu(true);
  };
  const closeMenu = (): void => {
    setIsOpenMenu(false);
  };

  return { isOpenMenu, openMenu, closeMenu };
};
