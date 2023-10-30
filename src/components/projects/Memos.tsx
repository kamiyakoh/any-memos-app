import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useHandleModal } from '../../hooks/useHandleModal';
import { useMemos } from '../../hooks/useMemos';
import { pickCategoriesState } from '../../states/pickCategoriesState';
import { Button } from '../uiParts/Button';
import { FrostedGlass } from '../uiParts/FrostedGlass';
import { Memo } from './Memo';

export const Memos: FC = () => {
  const { openCategory } = useHandleModal();
  const [pickCategories, setPickCatategories] = useRecoilState(pickCategoriesState);
  const {
    sortIdDate,
    pickDateDiff,
    pickMarkDiv,
    showMemos,
    categories,
    sortIdDateRadio,
    pickDateDiffRadio,
    pickMarkDivRadio,
    handleSortIdDateChange,
    handlePickDiffChange,
    handleMarkDivChange,
    pickMemos,
    showMemosDel,
  } = useMemos();

  useEffect(() => {
    pickMemos(sortIdDate, pickDateDiff, pickMarkDiv, pickCategories);
  }, [pickMemos, sortIdDate, pickDateDiff, pickMarkDiv, pickCategories]);
  useEffect(() => {
    setPickCatategories(categories);
  }, [setPickCatategories]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="w-full px-[5%] pb-[5.5rem] md:mt-[-4.5rem]">
      <FrostedGlass className="flex flex-wrap justify-around gap-4 w-fit mx-auto mb-4 p-6">
        <div>
          {sortIdDateRadio.map((item) => (
            <label key={item.value} className="mr-4">
              <input
                type="radio"
                value={item.value}
                checked={sortIdDate === item.value}
                onChange={handleSortIdDateChange}
              />
              &nbsp;{item.label}
              <br />
            </label>
          ))}
        </div>
        <div>
          {pickDateDiffRadio.map((item) => (
            <label key={item.value} className="mr-4">
              <input
                type="radio"
                value={item.value}
                checked={pickDateDiff === item.value}
                onChange={handlePickDiffChange}
              />
              &nbsp;{item.label}
              <br />
            </label>
          ))}
        </div>
        <div>
          {pickMarkDivRadio.map((item) => (
            <label key={item.value} className="mr-4">
              <input
                type="radio"
                value={item.value}
                checked={pickMarkDiv === item.value}
                onChange={handleMarkDivChange}
              />
              &nbsp;{item.label}
              <br />
            </label>
          ))}
        </div>
        <div className="flex flex-col items-start justify-between gap-y-6">
          <Button
            type="button"
            className="self-center bg-yellow-500 hover:bg-yellow-600"
            style={{ textShadow: '0.5px 0.5px 0 #000' }}
            onClick={openCategory}
          >
            カテゴリー
          </Button>
          <Button
            type="button"
            className={`self-center  ${
              showMemos !== undefined && showMemos?.length > 0
                ? 'bg-red-500 hover:bg-red-600 pointer-events-auto'
                : 'bg-gray-500 pointer-events-none'
            }`}
            onClick={showMemosDel}
          >
            まとめて削除
          </Button>
        </div>
      </FrostedGlass>
      <div className="flex flex-wrap w-full max-w-[1920px] gap-4 mx-auto">
        {showMemos?.map((memo) => <Memo key={memo.id} memo={memo} />)}
      </div>
    </div>
  );
};
