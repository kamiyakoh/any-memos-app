import { useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { categoriesState } from '../states/categories';
import { pickCategoriesState } from '../states/pickCategoriesState';

interface UseCategory {
  categories: string[];
  pickCategories: string[];
  addPickCategories: (category: string) => void;
  handlePickCategoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categoryLabel: (category: string) => string;
}

export const useCategory = (): UseCategory => {
  const categories = useRecoilValue<string[]>(categoriesState);
  const [pickCategories, setPickCatategories] = useRecoilState(pickCategoriesState);

  const addPickCategories = useCallback(
    (Category: string): void => {
      setPickCatategories([...pickCategories, Category]);
    },
    [pickCategories, setPickCatategories],
  );
  const handlePickCategoryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>): void => {
      const selectedCatValue = categories.find((cat) => cat === event.target.value);
      if (selectedCatValue !== undefined && selectedCatValue !== null) {
        if (event.target.checked) {
          setPickCatategories([...pickCategories, selectedCatValue]);
        } else {
          setPickCatategories(pickCategories.filter((cat) => cat !== selectedCatValue));
        }
      }
    },
    [categories, pickCategories, setPickCatategories],
  );
  const categoryLabel = useCallback((category: string): string => {
    if (
      category.includes('(カテゴリーなし)') ||
      category.includes('(カテゴリーなし）') ||
      category.includes('（カテゴリーなし)') ||
      category.includes('（カテゴリーなし）')
    )
      return `"${category}"`;
    if (category === '') return '（カテゴリーなし）';
    return category;
  }, []);

  return { categories, pickCategories, addPickCategories, handlePickCategoryChange, categoryLabel };
};
