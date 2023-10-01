import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isOpenNewState } from '../states/isOpenNew';

interface UseHandleModal {
  isOpenLogin: boolean;
  isOpenMenu: boolean;
  isOpenNew: boolean;
  openLogin: () => void;
  openMenu: () => void;
  openNew: () => void;
  closeLoginModal: () => void;
  closeMenuModal: () => void;
  closeNewModal: () => void;
}

export const useHandleModal = (): UseHandleModal => {
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenNew, setIsOpenNew] = useRecoilState<boolean>(isOpenNewState);

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
  const closeMenuModal = (): void => {
    setIsOpenMenu(false);
  };

  const closeNewModal = (): void => {
    setIsOpenNew(false);
  };

  return {
    isOpenLogin,
    isOpenMenu,
    isOpenNew,
    openLogin,
    openMenu,
    openNew,
    closeLoginModal,
    closeMenuModal,
    closeNewModal,
  };
};
