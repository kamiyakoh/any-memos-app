import type { BgImg, MixBlendMode } from '../types';
import { useEffect, useState, useMemo, useCallback } from 'react';
import dayjs from 'dayjs';
import { useMenu } from './useMenu';
import bgSpring from '../assets/img/bgSpring.jpg';
import bgSummer from '../assets/img/bgSummer.jpg';
import bgAutumn from '../assets/img/bgAutumn.jpg';
import bgWinter from '../assets/img/bgWinter.jpg';

interface BgFilter {
  colors: string[];
  mixBrendMode: MixBlendMode;
}
interface UseApp {
  bgImg: string;
  bgFilter: BgFilter;
}
interface BgFilters {
  midnight: BgFilter;
  morning: BgFilter;
  afternoon: BgFilter;
  evening: BgFilter;
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

  const [bgImg, setBgImg] = useState<string>(bgSpring);
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
  const unfixedBgImg = useCallback((addMonth: number): void => {
    const month = dayjs().add(addMonth, 'month').month() + 1;
    const bg = getBgImg(month);
    setBgImg(bg);
  }, []);
  const selectedBgImg = (bgImg: Omit<BgImg, 'unfixed'>): string => {
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
      default:
        bgImage = bgWinter;
        break;
    }

    return bgImage;
  };

  const [bgFilter, setBgFilter] = useState<BgFilter>(bgFilters.midnight);
  const getBgFilter = useCallback(
    (hours: number): BgFilter => {
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
  const unfixedBgFilter = useCallback(
    (addHours: number): void => {
      const hours = dayjs().add(addHours, 'hours').hour();
      const newBgFilter = getBgFilter(hours);
      setBgFilter(newBgFilter);
    },
    [getBgFilter],
  );

  useEffect(() => {
    if (menuOption.bgImg === 'unfixed') {
      unfixedBgImg(menuOption.addMonth);
    } else {
      setBgImg(selectedBgImg(menuOption.bgImg));
    }

    if (menuOption.bgFilter === 'unfixed') {
      unfixedBgFilter(menuOption.addHours);
    } else {
      const filter = bgFilters[menuOption.bgFilter];
      setBgFilter(filter);
    }
  }, [
    bgFilters,
    menuOption.bgFilter,
    menuOption.bgImg,
    menuOption.addHours,
    menuOption.addMonth,
    unfixedBgFilter,
    unfixedBgImg,
  ]);

  return { bgImg, bgFilter };
};
