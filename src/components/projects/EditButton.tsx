import type { MemoData } from '../../types';
import { FC } from 'react';
import { Button } from '../uiParts/Button';

interface Props {
  memo: MemoData;
  openEdit: (memo: MemoData) => void;
}

export const EditButton: FC<Props> = ({ memo, openEdit }) => {
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
