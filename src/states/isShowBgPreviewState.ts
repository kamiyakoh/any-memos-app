import { atom } from 'recoil';
import { recoilKey } from './recoilKey';

export const isShowBgPreviewState = atom<boolean>({
  key: recoilKey.isShowBgPreviewState,
  default: false,
});
