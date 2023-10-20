import { atom } from 'recoil';
import { recoilKey } from './recoilKey';

export const categoriesState = atom<string[]>({
  key: recoilKey.categoriesState,
  default: [],
});
