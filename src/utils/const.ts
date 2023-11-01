import type { BgImg, BgFilter, SortIdDate, PickDateDiff, PickMarkDiv } from '../types';

interface BgImgOptions {
  value: BgImg;
  label: string;
}
interface BgFilterOptions {
  value: BgFilter;
  label: string;
}
interface SortIdDateRadio {
  value: SortIdDate;
  label: string;
}
interface PickDateDiffRadio {
  value: PickDateDiff;
  label: string;
}
interface PickMarkDivRadio {
  value: PickMarkDiv;
  label: string;
}

export const bgImgOptions: BgImgOptions[] = [
  { value: 'unfixed', label: '画像を固定しない' },
  { value: 'spring', label: '春' },
  { value: 'summer', label: '夏' },
  { value: 'autumn', label: '秋' },
  { value: 'winter', label: '冬' },
];
export const bgFilterOptions: BgFilterOptions[] = [
  { value: 'unfixed', label: '時間帯を固定しない' },
  { value: 'midnight', label: '深夜 (0時 ～ 6時)' },
  { value: 'morning', label: '朝 (6時 ～ 12時)' },
  { value: 'afternoon', label: '昼 (12時 ～ 18時)' },
  { value: 'evening', label: '夕宵 (18時 ～ 24時)' },
];
export const sortIdDateRadio: SortIdDateRadio[] = [
  { value: 'idAsc', label: 'ID小さい順' },
  { value: 'idDesc', label: 'ID大きい順' },
  { value: 'dateAsc', label: '期限日時古い順' },
  { value: 'dateDesc', label: '期限日時新しい順' },
];
export const pickDateDiffRadio: PickDateDiffRadio[] = [
  { value: 'all', label: '全て' },
  { value: 'rest', label: '残りあり' },
  { value: 'over', label: '超過' },
];
export const pickMarkDivRadio: PickMarkDivRadio[] = [
  { value: '-1', label: '全て' },
  { value: '1', label: '★あり' },
  { value: '0', label: '-なし' },
];
