import type { EditState } from '../states/editState';
import type { MemoData } from '../types';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isOpenCategoryState } from '../states/isOpenCategoryState';
import { editState } from '../states/editState';

interface UseHandleModal {
  isOpenLogin: boolean;
  isOpenCategory: boolean;
  edit: EditState;
  openLogin: () => void;
  openCategory: () => void;
  openEdit: (memo: MemoData) => void;
  closeLoginModal: () => void;
  closeCategory: () => void;
  closeEditModal: () => void;
}

export const useHandleModal = (): UseHandleModal => {
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isOpenCategory, setIsCategory] = useRecoilState<boolean>(isOpenCategoryState);
  const [edit, setEdit] = useRecoilState<EditState>(editState);

  const openLogin = (): void => {
    setIsOpenLogin(true);
  };
  const openCategory = (): void => {
    setIsCategory(true);
  };
  const openEdit = (memo: MemoData): void => {
    setEdit({ isOpenEdit: true, editMemo: memo });
  };
  const closeLoginModal = (): void => {
    setIsOpenLogin(false);
  };
  const closeCategory = (): void => {
    setIsCategory(false);
  };
  const closeEditModal = (): void => {
    setEdit({
      isOpenEdit: false,
      editMemo: { id: '', title: '', category: '', description: '', date: '', markDiv: 0 },
    });
  };

  return {
    isOpenLogin,
    isOpenCategory,
    edit,
    openLogin,
    openCategory,
    openEdit,
    closeLoginModal,
    closeCategory,
    closeEditModal,
  };
};
