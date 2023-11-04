import type { EditState } from '../states/editState';
import type { MemoData } from '../types';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { editState } from '../states/editState';

interface UseHandleModal {
  isOpenLogin: boolean;
  edit: EditState;
  openLogin: () => void;
  openEdit: (memo: MemoData) => void;
  closeLoginModal: () => void;
  closeEditModal: () => void;
}

export const useHandleModal = (): UseHandleModal => {
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [edit, setEdit] = useRecoilState<EditState>(editState);

  const openLogin = (): void => {
    setIsOpenLogin(true);
  };
  const openEdit = (memo: MemoData): void => {
    setEdit({ isOpenEdit: true, editMemo: memo });
  };
  const closeLoginModal = (): void => {
    setIsOpenLogin(false);
  };
  const closeEditModal = (): void => {
    setEdit({
      isOpenEdit: false,
      editMemo: { id: '', title: '', category: '', description: '', date: '', markDiv: 0 },
    });
  };

  return {
    isOpenLogin,
    edit,
    openLogin,
    openEdit,
    closeLoginModal,
    closeEditModal,
  };
};
