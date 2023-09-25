import { useState } from 'react';

interface UseHandleModal {
  isOpenLogin: boolean;
  isOpenMenu: boolean;
  isOpenNew: boolean;
  openLogin: () => void;
  openMenu: () => void;
  openNew: () => void;
  closeLoginModal: () => void;
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
  const closeLoginModal = (): void => {
    setIsOpenLogin(false);
  };
  const closeModal = (): void => {
    setIsOpenMenu(false);
    setIsOpenNew(false);
  };

  return { isOpenLogin, isOpenMenu, isOpenNew, openLogin, openMenu, openNew, closeLoginModal, closeModal };
};
