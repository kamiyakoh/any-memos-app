import { useState } from 'react';

interface UseHandleModal {
  isOpenLogin: boolean;
  openLogin: () => void;
  closeLoginModal: () => void;
}

export const useHandleModal = (): UseHandleModal => {
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);

  const openLogin = (): void => {
    setIsOpenLogin(true);
  };
  const closeLoginModal = (): void => {
    setIsOpenLogin(false);
  };

  return {
    isOpenLogin,
    openLogin,
    closeLoginModal,
  };
};
