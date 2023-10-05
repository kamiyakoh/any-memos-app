import type { EditState } from '../states/editState';
import type { MemoData } from '../types';
import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isOpenNewState } from '../states/isOpenNew';
import { editState } from '../states/editState';

interface UseHandleModal {
  isOpenLogin: boolean;
  isOpenMenu: boolean;
  isOpenNew: boolean;
  edit: EditState;
  openLogin: () => void;
  openMenu: () => void;
  openNew: () => void;
  openEdit: (memo: MemoData) => void;
  closeLoginModal: () => void;
  closeMenuModal: () => void;
  closeNewModal: () => void;
  closeEditModal: () => void;
}

export const useHandleModal = (): UseHandleModal => {
  const [isOpenLogin, setIsOpenLogin] = useState<boolean>(false);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [isOpenNew, setIsOpenNew] = useRecoilState<boolean>(isOpenNewState);
  const [edit, setEdit] = useRecoilState<EditState>(editState);

  const openLogin = (): void => {
    setIsOpenLogin(true);
  };
  const openMenu = (): void => {
    setIsOpenMenu(true);
  };
  const openNew = (): void => {
    setIsOpenNew(true);
  };
  const openEdit = (memo: MemoData): void => {
    setEdit({ isOpenEdit: true, editMemo: memo });
  };
  const closeLoginModal = (): void => {
    setIsOpenLogin(false);
  };
  const closeMenuModal = (): void => {
    setIsOpenMenu(false);
  };
  const closeNewModal = (): void => {
    setIsOpenNew(false);
  };
  const closeEditModal = (): void => {
    setEdit({
      isOpenEdit: false,
      editMemo: { id: '', title: '', category: '', description: '', date: '', markDiv: 0 },
    });
  };

  return {
    isOpenLogin,
    isOpenMenu,
    isOpenNew,
    edit,
    openLogin,
    openMenu,
    openNew,
    openEdit,
    closeLoginModal,
    closeMenuModal,
    closeNewModal,
    closeEditModal,
  };
};
