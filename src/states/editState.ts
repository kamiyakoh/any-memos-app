import type { MemoData } from '../types';
import { atom } from 'recoil';
import { recoilKey } from './recoilKey';

export interface EditState {
  isOpenEdit: boolean;
  editMemo: MemoData;
}

export const editState = atom<EditState>({
  key: recoilKey.editState,
  default: {
    isOpenEdit: false,
    editMemo: { id: '', title: '', category: '', description: '', date: '', markDiv: 0 },
  },
});
