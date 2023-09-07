import type { Memo } from '../types';
import { atom } from 'recoil';
import { recoilKey } from '../states/recoilKey';

export const memosState = atom<Memo[]>({
  key: recoilKey.memosState,
  default: [],
});
