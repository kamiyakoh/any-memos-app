import { FC, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
// import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { Router } from './routers/Router';
import { useApp } from './hooks/useApp';
import { useHandleModal } from './hooks/useHandleModal';
import { useLogin } from './hooks/useLogin';
import { useMenu } from './hooks/useMenu';
import { worker } from './serviceWorker';
import { Modal } from './components/uiParts/Modal';
import { Login } from './components/projects/Login';
import { Menu } from './components/projects/Menu';
import { New } from './components/projects/New';
import { Edit } from './components/projects/Edit';
import { Memos } from './components/pages/Memos';
import menuIcon from './assets/img/menuIcon.png';

worker.start(); // eslint-disable-line @typescript-eslint/no-floating-promises

export const App: FC = () => {
  const { bgImg, bgFilter } = useApp();
  const { isOpenMenu, isOpenNew, edit, openMenu, openNew, closeMenuModal, closeNewModal, closeEditModal } =
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
          className={`fixed top-4 right-4 z-50 rounded bg-black bg-opacity-50 p-2 min-[1936px]:right-[calc((100%_-_1920px)_/_2)] ${
            isShowBgPreview ? 'hidden' : ''
          }`}
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={openMenu}
        >
          <img src={menuIcon} alt="menuIcon" />
        </button>
      )}
      {isAuth && !isOpenNew && (
        <button
          className={`fixed top-4 left-4 z-50 text-4xl px-4 h-16 bg-blue-500 text-white rounded hover:bg-blue-600 min-[1936px]:left-[calc((100%_-_1920px)_/_2)]  ${
            isShowBgPreview ? 'hidden' : ''
          }`}
          onClick={openNew}
        >
          作成
        </button>
      )}
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
        {isAuth && (
          <div
            className={`absolute top-0 left-0 z-40 text-white w-full overflow-y-auto  ${
              isShowBgPreview ? 'hidden' : ''
            }`}
          >
            <div className="max-h-screen pt-[5.5rem]">
              <ErrorBoundary
                fallback={
                  <div className="flex justify-center">
                    <p className="bg-black bg-opacity-50 rounded p-4 mb4" style={{ backdropFilter: 'blur(4px)' }}>
                      メモデータを読み込みに失敗しました
                    </p>
                  </div>
                }
              >
                <Suspense
                  fallback={
                    <div className="flex justify-center">
                      <p className="bg-black bg-opacity-50 rounded p-4 mb4" style={{ backdropFilter: 'blur(4px)' }}>
                        メモデータを読み込み中...
                      </p>
                    </div>
                  }
                >
                  <Memos />
                </Suspense>
              </ErrorBoundary>
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={edit.isOpenEdit} isLogin={false} borderColorClass="border-green-600" onClose={closeEditModal}>
        {edit.isOpenEdit && <Edit memo={edit.editMemo} closeModal={closeEditModal} />}
      </Modal>
      <Modal isOpen={isOpenNew} isLogin={false} borderColorClass="border-blue-500" onClose={closeNewModal}>
        {isOpenNew && <New />}
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
          style: { background: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '1rem', backdropFilter: 'blur(4px)' },
        }}
      />
    </div>
  );
};
