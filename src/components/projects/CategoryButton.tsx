import { FC } from 'react';
import { Button } from '../uiParts/Button';

interface Props {
  openCategory: () => void;
}

export const CategoryButton: FC<Props> = ({ openCategory }) => {
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
