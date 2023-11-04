import { useState } from 'react';

interface UseNewButton {
  isOpenNew: boolean;
  openNew: () => void;
  closeNew: () => void;
}

export const useNewButton = (): UseNewButton => {
  const [isOpenNew, setIsOpenNew] = useState<boolean>(false);

  const openNew = (): void => {
    setIsOpenNew(true);
  };
  const closeNew = (): void => {
    setIsOpenNew(false);
  };

  return { isOpenNew, openNew, closeNew };
};
