import type { MemoData } from '../types';
import type { EditState } from '../states/editState';
import { useRecoilState } from 'recoil';
import { editState } from '../states/editState';

interface UseEditButton {
  edit: EditState;
  openEdit: (memo: MemoData) => void;
  closeEdit: () => void;
}

export const useEditButton = (): UseEditButton => {
  const [edit, setEdit] = useRecoilState<EditState>(editState);

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
