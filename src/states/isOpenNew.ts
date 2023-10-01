import { atom } from 'recoil';
import { recoilKey } from './recoilKey';

export const isOpenNewState = atom<boolean>({
  key: recoilKey.isOpenNewState,
  default: false,
});
