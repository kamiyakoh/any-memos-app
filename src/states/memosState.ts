import type { MemoData } from '../types';
import { atom } from 'recoil';
import { recoilKey } from '../states/recoilKey';

export const memosState = atom<MemoData[]>({
  key: recoilKey.memosState,
  default: [],
});
