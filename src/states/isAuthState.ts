import { atom } from 'recoil';
import { recoilKey } from './recoilKey';

export const isAuthState = atom<boolean>({
  key: recoilKey.isAuthState,
  default: false,
});
