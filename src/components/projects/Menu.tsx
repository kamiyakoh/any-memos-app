import { FC } from 'react';
import { useMenu } from '../../hooks/useMenu';

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
      <div className={`w-full pb-4 mt-6 mb-8 ${isFixedBgImg ? 'bg-black bg-opacity-60' : ''}`}>
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

      <div className={`w-full pb-4 mt-6 ${isFixedBgFilter ? 'bg-black bg-opacity-60' : ''}`}>
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
    </div>
  );
};
