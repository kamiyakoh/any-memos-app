import { FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useApp } from './hooks/useApp';
import { useHandleModal } from './hooks/useHandleModal';
import { useLogin } from './hooks/useLogin';
import { useMenu } from './hooks/useMenu';
import { worker } from './serviceWorker';
import { Modal } from './components/uiParts/Modal';
import { FrostedGlass } from './components/uiParts/FrostedGlass';
import { Login } from './components/projects/Login';
import { Menu } from './components/projects/Menu';
import { NewButton } from './components/projects/NewButton';
import { Category } from './components/projects/Category';
import { Edit } from './components/projects/Edit';
import { Contents } from './components/pages/Contents';
import menuIcon from './assets/img/menuIcon.png';

worker.start(); // eslint-disable-line @typescript-eslint/no-floating-promises

export const App: FC = () => {
  const { bgImg, bgFilter } = useApp();
  const { isOpenMenu, isOpenCategory, edit, openMenu, closeMenuModal, closeCategory, closeEditModal } =
    useHandleModal();
  const { isAuth, isLoading, fetchIsAuth } = useLogin();
  const { isShowBgPreview, onClickCloseBgPreview } = useMenu();

  useEffect(() => {
    fetchIsAuth();
  }, [fetchIsAuth]);

  return (
    <div>
      {isAuth && !isOpenMenu && (
        <button
          className={`fixed top-4 right-4 z-50 min-[1936px]:right-[calc((100%_-_1920px)_/_2)] ${
            isShowBgPreview ? 'hidden' : ''
          }`}
          onClick={openMenu}
        >
          <FrostedGlass style={{ padding: '0.5rem' }}>
            <img src={menuIcon} alt="menuIcon" />
          </FrostedGlass>
        </button>
      )}
      {isAuth && !isShowBgPreview && <NewButton />}
      <div className="h-full min-h-screen relative bg-center bg-cover" style={{ backgroundImage: `url(${bgImg})` }}>
        <div
          className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-b"
          style={{
            background: `linear-gradient(to bottom, ${bgFilter.colors[0]}, ${bgFilter.colors[1]})`,
            mixBlendMode: bgFilter.mixBrendMode,
          }}
        >
          {isShowBgPreview && <button className="w-full h-full" onClick={onClickCloseBgPreview} />}
        </div>
        {isAuth && <Contents />}
      </div>
      <Modal isOpen={edit.isOpenEdit} isLogin={false} borderColorClass="border-green-600" onClose={closeEditModal}>
        {edit.isOpenEdit && <Edit memo={edit.editMemo} closeModal={closeEditModal} />}
      </Modal>
      <Modal isOpen={isOpenCategory} isLogin={false} borderColorClass="border-yellow-500" onClose={closeCategory}>
        {isOpenCategory && <Category />}
      </Modal>

      {!isShowBgPreview && (
        <Modal isOpen={isOpenMenu} isLogin={false} borderColorClass="border-gray-500" onClose={closeMenuModal}>
          {isOpenMenu && <Menu />}
        </Modal>
      )}
      {!isLoading && (
        <Modal isOpen={!isAuth} borderColorClass="border-violet-500" isLogin={true}>
          {!isAuth && <Login />}
        </Modal>
      )}
      <Toaster
        toastOptions={{
          style: {
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            background: 'rgba(0, 0, 0, 0.5)',
            color: '#fff',
            maxWidth: '90vw',
            padding: '1rem',
            backdropFilter: 'blur(4px)',
          },
        }}
      />
    </div>
  );
};
