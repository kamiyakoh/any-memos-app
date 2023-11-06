import type { MemoData } from '../../types';
import { FC } from 'react';
import { useEditButton } from '../../hooks/useEditButton';
import { Button } from '../uiParts/Button';

interface Props {
  memo: MemoData;
}

export const EditButton: FC<Props> = ({ memo }) => {
  const { openEdit } = useEditButton();

  return (
    <Button
      type="button"
      className="bg-green-600 hover:bg-green-700"
      onClick={() => {
        openEdit(memo);
      }}
    >
      編集
    </Button>
  );
};
