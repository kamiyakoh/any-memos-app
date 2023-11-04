import { useRecoilState } from 'recoil';
import { isOpenCategoryState } from '../states/isOpenCategoryState';

interface UseCategoryButton {
  isOpenCategory: boolean;
  openCategory: () => void;
  closeCategory: () => void;
}

export const useCategoryButton = (): UseCategoryButton => {
  const [isOpenCategory, setIsOpenCategory] = useRecoilState<boolean>(isOpenCategoryState);

  const openCategory = (): void => {
    setIsOpenCategory(true);
  };
  const closeCategory = (): void => {
    setIsOpenCategory(false);
  };

  return { isOpenCategory, openCategory, closeCategory };
};
