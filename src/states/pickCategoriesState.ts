import { atom } from 'recoil';
import { recoilKey } from './recoilKey';

export const pickCategoriesState = atom<string[]>({
  key: recoilKey.pickCategoriesState,
  default: [],
});
