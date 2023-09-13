import { useState } from 'react';

interface UseHandleModal {
  isOpenLogin: boolean;
  isOpenMenu: boolean;
  isOpenNew: boolean;
  openLogin: () => void;
  openMenu: () => void;
  openNew: () => void;
  closeModal: () => void;
}

export const useHandleModal = (): UseHandleModal => {
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenNew, setIsOpenNew] = useState<boolean>(false);

  const openLogin = (): void => {
    setIsOpenLogin(true);
  };
  const openMenu = (): void => {
    setIsOpenMenu(true);
  };
  const openNew = (): void => {
    setIsOpenNew(true);
  };
  const closeModal = (): void => {
    setIsOpenLogin(false);
    setIsOpenMenu(false);
    setIsOpenNew(false);
  };

  return { isOpenLogin, isOpenMenu, isOpenNew, openLogin, openMenu, openNew, closeModal };
};
