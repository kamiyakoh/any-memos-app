import { atom } from 'recoil';
import { recoilKey } from './recoilKey';

export const isOpenCategoryState = atom<boolean>({
  key: recoilKey.isOpenCategoryState,
  default: false,
});
