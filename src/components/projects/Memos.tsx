import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCategoryButton } from '../../hooks/useCategoryButton';
import { useEditButton } from '../../hooks/useEditButton';
import { useMemos } from '../../hooks/useMemos';
import { pickCategoriesState } from '../../states/pickCategoriesState';
import { sortIdDateRadio, pickDateDiffRadio, pickMarkDivRadio } from '../../utils/const';
import { Button } from '../uiParts/Button';
import { FrostedGlass } from '../uiParts/FrostedGlass';
import { Modal } from '../uiParts/Modal';
import { CategoryButton } from './CategoryButton';
import { Category } from '../../components/projects/Category';
import { Memo } from './Memo';
import { Edit } from './Edit';

export const Memos: FC = () => {
  const setPickCatategories = useSetRecoilState(pickCategoriesState);
  const { isOpenCategory, openCategory, closeCategory } = useCategoryButton();
  const { edit, openEdit, closeEdit } = useEditButton();
  const {
    sortIdDate,
    pickDateDiff,
    pickMarkDiv,
    showMemos,
    categories,
    handleSortIdDateChange,
    handlePickDiffChange,
    handleMarkDivChange,
    showMemosDel,
  } = useMemos();

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
        <div className="flex flex-col items-center justify-between gap-y-6">
          <CategoryButton openCategory={openCategory} />
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
        {showMemos?.map((memo) => <Memo key={memo.id} memo={memo} openEdit={openEdit} />)}
      </div>
      <Category isOpenCategory={isOpenCategory} closeCategory={closeCategory} />
      <Modal isOpen={edit.isOpenEdit} isLogin={false} borderColorClass="border-green-600" onClose={closeEdit}>
        <Edit memo={edit.editMemo} closeEdit={closeEdit} />
      </Modal>
    </div>
  );
};
