import type { BgImg, BgFilter, MixBlendMode } from '../types';
import { useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import { useMenu } from './useMenu';
import bgSpring from '../assets/img/bgSpring.jpg';
import bgSummer from '../assets/img/bgSummer.jpg';
import bgAutumn from '../assets/img/bgAutumn.jpg';
import bgWinter from '../assets/img/bgWinter.jpg';

interface BgBrend {
  colors: string[];
  mixBrendMode: MixBlendMode;
}
interface UseApp {
  bgImg: string;
  bgFilter: BgBrend;
}
interface BgFilters {
  midnight: BgBrend;
  morning: BgBrend;
  afternoon: BgBrend;
  evening: BgBrend;
}

export const useApp = (): UseApp => {
  const { menuOption } = useMenu();
  const bgFilters: BgFilters = useMemo(
    () => ({
      midnight: { colors: ['#383E71', '#f06eaa'], mixBrendMode: 'difference' },
      morning: { colors: ['#f7dc87', '#91EAE4'], mixBrendMode: 'soft-light' },
      afternoon: { colors: ['#91EAE4', '#F8A1D1'], mixBrendMode: 'color-burn' },
      evening: { colors: ['#F8A1D1', '#383E71'], mixBrendMode: 'multiply' },
    }),
    [],
  );

  const getBgImg = (month: number): string => {
    if (month >= 3 && month < 6) {
      return bgSpring;
    } else if (month >= 6 && month < 9) {
      return bgSummer;
    } else if (month >= 9 && month < 12) {
      return bgAutumn;
    } else {
      return bgWinter;
    }
  };

  const selectedBgImg = useCallback((bgImg: BgImg, addMonth: number): string => {
    const month = dayjs().add(addMonth, 'month').month() + 1;
    let bgImage = '';
    switch (bgImg) {
      case 'spring':
        bgImage = bgSpring;
        break;
      case 'summer':
        bgImage = bgSummer;
        break;
      case 'autumn':
        bgImage = bgAutumn;
        break;
      case 'winter':
        bgImage = bgWinter;
        break;
      default:
        bgImage = getBgImg(month);
        break;
    }

    return bgImage;
  }, []);

  const getBgFilter = useCallback(
    (hours: number): BgBrend => {
      if (hours >= 6 && hours < 12) {
        return bgFilters.morning;
      } else if (hours >= 12 && hours < 18) {
        return bgFilters.afternoon;
      } else if (hours >= 18 && hours < 24) {
        return bgFilters.evening;
      } else {
        return bgFilters.midnight;
      }
    },
    [bgFilters],
  );
  const selectedBgFilter = useCallback(
    (menuOptionBgFilter: BgFilter, addHours: number): BgBrend => {
      let filter;
      if (menuOptionBgFilter === 'unfixed') {
        const hours = dayjs().add(addHours, 'hours').hour();
        filter = getBgFilter(hours);
      } else {
        filter = bgFilters[menuOptionBgFilter];
      }
      return filter;
    },
    [bgFilters, getBgFilter],
  );

  const bgImg = selectedBgImg(menuOption.bgImg, menuOption.addMonth);
  const bgFilter = selectedBgFilter(menuOption.bgFilter, menuOption.addHours);

  return { bgImg, bgFilter };
};
