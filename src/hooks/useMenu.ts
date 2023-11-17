import type { MenuOption } from '../types';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import toast from 'react-hot-toast';
import { menuOptionState } from '../states/menuOptionState';
import { bgImgOptions, bgFilterOptions } from '../utils/const';

interface UseMenu {
  menuOption: MenuOption;
  isFixedBgImg: boolean;
  isFixedBgFilter: boolean;
  isShowBgPreview: boolean;
  handleBgImgChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBgFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddMonth: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddHours: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickErrorToast: (isFixed: boolean) => void;
  onClickShowBgPreview: () => void;
  onClickCloseBgPreview: () => void;
  onClickMenuReset: () => void;
}

export const useMenu = (): UseMenu => {
  const [menuOption, setMenuOption] = useRecoilState(menuOptionState);
  const [isShowBgPreview, setIsShowBgPreview] = useState(false);
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
  const onClickShowBgPreview = (): void => {
    setIsShowBgPreview(true);
    toast('背景プレビューを終了するには\n画面をタッチ・クリックしてください');
  };
  const onClickCloseBgPreview = (): void => {
    setIsShowBgPreview(false);
  };
  const onClickMenuReset = (): void => {
    if (window.confirm('メニューを初期化しますか？')) {
      setMenuOption({ bgImg: 'unfixed', bgFilter: 'unfixed', addMonth: 0, addHours: 0 });
    }
  };

  return {
    menuOption,
    isFixedBgImg,
    isFixedBgFilter,
    isShowBgPreview,
    handleBgImgChange,
    handleBgFilterChange,
    handleAddMonth,
    handleAddHours,
    onClickErrorToast,
    onClickShowBgPreview,
    onClickCloseBgPreview,
    onClickMenuReset,
  };
};
