import { FC } from 'react';
import { useCategoryButton } from '../../hooks/useCategoryButton';
import { Button } from '../uiParts/Button';

export const CategoryButton: FC = () => {
  const { openCategory } = useCategoryButton();

  return (
    <div>
      <Button
        type="button"
        className="self-center bg-yellow-500 hover:bg-yellow-600"
        style={{ textShadow: '0.5px 0.5px 0 #000' }}
        onClick={openCategory}
      >
        カテゴリー
      </Button>
    </div>
  );
};
