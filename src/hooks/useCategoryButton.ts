import { useState } from 'react';

interface UseCategoryButton {
  isOpenCategory: boolean;
  openCategory: () => void;
  closeCategory: () => void;
}

export const useCategoryButton = (): UseCategoryButton => {
  const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);

  const openCategory = (): void => {
    setIsOpenCategory(true);
  };
  const closeCategory = (): void => {
    setIsOpenCategory(false);
  };

  return { isOpenCategory, openCategory, closeCategory };
};
