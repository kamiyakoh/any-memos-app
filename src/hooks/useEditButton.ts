import type { MemoData } from '../types';
import { useState } from 'react';

interface EditState {
  isOpenEdit: boolean;
  editMemo: MemoData;
}
interface UseEditButton {
  edit: EditState;
  openEdit: (memo: MemoData) => void;
  closeEdit: () => void;
}

export const useEditButton = (): UseEditButton => {
  const [edit, setEdit] = useState<EditState>({
    isOpenEdit: false,
    editMemo: { id: '', title: '', category: '', description: '', date: '', markDiv: 0 },
  });

  const openEdit = (memo: MemoData): void => {
    setEdit({ isOpenEdit: true, editMemo: memo });
  };
  const closeEdit = (): void => {
    setEdit({
      isOpenEdit: false,
      editMemo: { id: '', title: '', category: '', description: '', date: '', markDiv: 0 },
    });
  };

  return { edit, openEdit, closeEdit };
};
