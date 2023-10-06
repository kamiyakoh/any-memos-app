import { FC } from 'react';
import { useMenu } from '../../hooks/useMenu';
import { Button } from '../uiParts/Button';

export const Menu: FC = () => {
  const {
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
    onClickShowBgPreview,
    onClickMenuReset,
  } = useMenu();

  return (
    <div>
      <p>背景画像（季節）</p>
      <div className="flex flex-col lg:flex-row mt-2">
        {bgImgOptions.map((op) => (
          <label key={op.value} className="mr-4">
            <input type="radio" value={op.value} checked={menuOption.bgImg === op.value} onChange={handleBgImgChange} />
            {op.label}
          </label>
        ))}
      </div>
      <div
        className={`relative w-full pb-4 mt-6 mb-8 ${isFixedBgImg ? 'bg-black bg-opacity-60' : ''}`}
        onClick={() => {
          onClickErrorToast(isFixedBgImg);
        }}
      >
        {isFixedBgImg && <div className="absolute top-0 left-0 z-10 w-full h-full" />}
        <p>月調整</p>
        <label>
          +
          <input
            type="number"
            value={menuOption.addMonth}
            onChange={handleAddMonth}
            min={0}
            max={11}
            disabled={isFixedBgImg}
          />
        </label>
      </div>
      <p>時間帯フィルター</p>
      <div className="flex flex-col lg:flex-row mt-2">
        {bgFilterOptions.map((op) => (
          <label key={op.value} className="mr-4">
            <input
              type="radio"
              value={op.value}
              checked={menuOption.bgFilter === op.value}
              onChange={handleBgFilterChange}
            />
            {op.label}
          </label>
        ))}
      </div>
      <div
        className={`relative w-full pb-4 mt-6 ${isFixedBgFilter ? 'bg-black bg-opacity-60' : ''}`}
        onClick={() => {
          onClickErrorToast(isFixedBgFilter);
        }}
      >
        {isFixedBgFilter && <div className="absolute top-0 left-0 z-10 w-full h-full" />}
        <p>時間調整</p>
        <label>
          {menuOption.addHours >= 0 && '+'}
          <input
            type="number"
            value={menuOption.addHours}
            onChange={handleAddHours}
            min={-23}
            max={23}
            disabled={isFixedBgFilter}
          />
        </label>
      </div>
      <div className="flex justify-between flex-wrap gap-4 text-white mt-6">
        <Button type="button" className="bg-orange-500 hover:bg-orange-600" onClick={onClickShowBgPreview}>
          背景プレビュー
        </Button>
        <Button type="button" className="bg-gray-500 hover:bg-gray-600" onClick={onClickMenuReset}>
          メニュー初期化
        </Button>
      </div>
    </div>
  );
};
