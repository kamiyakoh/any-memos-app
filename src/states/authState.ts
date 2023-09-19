import { atom } from 'recoil';
import { recoilKey } from './recoilKey';

interface Auth {
  isAuth: boolean;
}

export const authState = atom<Auth>({
  key: recoilKey.authState,
  default: { isAuth: false },
});
