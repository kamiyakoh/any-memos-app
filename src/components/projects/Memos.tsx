import { FC, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useModal } from '../../hooks/useModal';
import { useMemos } from '../../hooks/useMemos';
import { pickCategoriesState } from '../../states/pickCategoriesState';
import { sortIdDateRadio, pickDateDiffRadio, pickMarkDivRadio } from '../../utils/const';
import { Button } from '../uiParts/Button';
import { FrostedGlass } from '../uiParts/FrostedGlass';
import { Modal } from '../uiParts/Modal';
import { Memo } from './Memo';
import { Menu } from './Menu';
import { Category } from '../../components/projects/Category';
import { New } from './New';
import { Edit } from './Edit';
import menuIcon from '../../assets/img/menuIcon.png';

export const Memos: FC = () => {
  const setPickCatategories = useSetRecoilState(pickCategoriesState);
  const { selectedModal, selectedMemo, openModal, closeModal } = useModal();
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
      <button
        className={`fixed top-4 left-4 z-40 text-4xl px-4 h-16 bg-blue-500 text-white rounded hover:bg-blue-600 min-[1936px]:left-[calc((100%_-_1920px)_/_2)]`}
        onClick={() => {
          openModal('new');
        }}
      >
        作成
      </button>
      <button
        className={`fixed top-4 right-4 z-40 min-[1936px]:right-[calc((100%_-_1920px)_/_2)]`}
        onClick={() => {
          openModal('menu');
        }}
      >
        <FrostedGlass style={{ padding: '0.5rem' }}>
          <img src={menuIcon} alt="menuIcon" />
        </FrostedGlass>
      </button>
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
          <Button
            type="button"
            className="self-center bg-yellow-500 hover:bg-yellow-600"
            style={{ textShadow: '0.5px 0.5px 0 #000' }}
            onClick={() => {
              openModal('category');
            }}
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
        {showMemos?.map((memo) => <Memo key={memo.id} memo={memo} openModal={openModal} />)}
      </div>
      <Modal selectedModal={selectedModal} onClose={closeModal}>
        {selectedModal === 'menu' && <Menu />}
        {selectedModal === 'category' && <Category />}
        {selectedModal === 'new' && <New />}
        {selectedModal === 'edit' && <Edit memo={selectedMemo} closeModal={closeModal} />}
      </Modal>
    </div>
  );
};
