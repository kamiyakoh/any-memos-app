import type { BgImg, BgFilter, MenuOption } from '../types';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import toast from 'react-hot-toast';
import { menuOptionState } from '../states/menuOptionState';

interface BgImgOptions {
  value: BgImg;
  label: string;
}
interface BgFilterOptions {
  value: BgFilter;
  label: string;
}
interface UseMenu {
  menuOption: MenuOption;
  isFixedBgImg: boolean;
  isFixedBgFilter: boolean;
  bgImgOptions: BgImgOptions[];
  bgFilterOptions: BgFilterOptions[];
  handleBgImgChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBgFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddMonth: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddHours: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickErrorToast: (isFixed: boolean) => void;
}

export const useMenu = (): UseMenu => {
  const [menuOption, setMenuOption] = useRecoilState(menuOptionState);
  const [isFixedBgImg, setIsFixedBgImg] = useState(false);
  const [isFixedBgFilter, setIsFixedBgFilter] = useState(false);
  useEffect(() => {
    if (menuOption.bgImg !== 'unfixed') {
      setIsFixedBgImg(true);
    } else {
      setIsFixedBgImg(false);
    }
    if (menuOption.bgFilter !== 'unfixed') {
      setIsFixedBgFilter(true);
    } else {
      setIsFixedBgFilter(false);
    }
  }, [menuOption.bgImg, menuOption.bgFilter]);

  const bgImgOptions: BgImgOptions[] = [
    { value: 'unfixed', label: '画像を固定しない' },
    { value: 'spring', label: '春' },
    { value: 'summer', label: '夏' },
    { value: 'autumn', label: '秋' },
    { value: 'winter', label: '冬' },
  ];
  const handleBgImgChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedValue = event.target.value;
    const selectedOption = bgImgOptions.find((op) => op.value === selectedValue) ?? {
      value: 'unfixed',
      label: '画像を固定しない',
    };
    if (selectedOption !== null) {
      setMenuOption({ ...menuOption, bgImg: selectedOption.value });
    }
  };

  const bgFilterOptions: BgFilterOptions[] = [
    { value: 'unfixed', label: '時間帯を固定しない' },
    { value: 'midnight', label: '深夜 (0時 ～ 6時)' },
    { value: 'morning', label: '朝 (6時 ～ 12時)' },
    { value: 'afternoon', label: '昼 (12時 ～ 18時)' },
    { value: 'evening', label: '夕宵 (18時 ～ 24時)' },
  ];
  const handleBgFilterChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedValue = event.target.value;
    const selectedOption = bgFilterOptions.find((op) => op.value === selectedValue) ?? {
      value: 'unfixed',
      label: '時間帯を固定しない',
    };
    if (selectedOption !== null) {
      setMenuOption({ ...menuOption, bgFilter: selectedOption.value });
    }
  };

  const handleAddMonth = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedValue = Math.floor(parseInt(event.target.value));
    if (selectedValue >= 0 && selectedValue < 12) {
      setMenuOption({ ...menuOption, addMonth: selectedValue });
    }
  };
  const handleAddHours = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedValue = parseInt(event.target.value);
    let newValue = 0;
    if (selectedValue < 0) {
      newValue = Math.ceil(selectedValue);
    } else {
      newValue = Math.floor(selectedValue);
    }

    if (newValue >= -23 && newValue <= 23) {
      setMenuOption({ ...menuOption, addHours: newValue });
    }
  };
  const onClickErrorToast = (isFixed: boolean): void => {
    if (isFixed) toast.error(`変更するには"固定しない"を選択してください`);
  };

  return {
    menuOption,
    isFixedBgImg,
    isFixedBgFilter,
    bgImgOptions,
    bgFilterOptions,
    handleBgImgChange,
    handleBgFilterChange,
    handleAddMonth,
    handleAddHours,
    onClickErrorToast,
  };
};
