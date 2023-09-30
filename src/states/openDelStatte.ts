import { atom } from 'recoil';
import { recoilKey } from './recoilKey';

export const currentIdOpenDelState = atom<string>({
  key: recoilKey.currentIdOpenDelState,
  default: '',
});
