export type MixBlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

export type BgImg = 'unfixed' | 'spring' | 'summer' | 'autumn' | 'winter';
export type BgFilter = 'unfixed' | 'midnight' | 'morning' | 'afternoon' | 'evening';
export type SortIdDate = 'idAsc' | 'idDesc' | 'dateAsc' | 'dateDesc';
export type PickDateDiff = 'all' | 'rest' | 'over';
export type PickMarkDiv = '-1' | '0' | '1';

export interface AccessToken {
  accessToken: string;
  accessTokenExp: string;
}
export interface MemoData {
  id: string;
  title: string;
  category: string;
  description: string;
  date: string;
  markDiv: number;
}
export interface MenuOption {
  bgImg: BgImg;
  bgFilter: BgFilter;
  addMonth: number;
  addHours: number;
}
