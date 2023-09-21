import { FC, useEffect, Suspense } from 'react';
import { useRecoilState } from 'recoil';
import { ErrorBoundary } from 'react-error-boundary';
// import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { Router } from './routers/Router';
import { useApp } from './hooks/useApp';
import { useHandleModal } from './hooks/useHandleModal';
import { useLogin } from './hooks/useLogin';
import { worker } from './serviceWorker';
import { authState } from './states/authState';
import { Modal } from './components/projects/Modal';
import { Login } from './components/projects/Login';
import { Menu } from './components/projects/Menu';
import { New } from './components/projects/New';
import { Memos } from './components/pages/Memos';
import menuIcon from './assets/img/menuIcon.png';

// モックサービスワーカーを起動
worker.start(); // eslint-disable-line @typescript-eslint/no-floating-promises

export const App: FC = () => {
  const [auth] = useRecoilState(authState);
  const { bgImg, bgFilter } = useApp();
  const { isOpenMenu, isOpenNew, openMenu, openNew, closeModal } = useHandleModal();
  const { fetchIsAuth } = useLogin();

  useEffect(() => {
    fetchIsAuth();
  }, []);

  return (
    <div>
      {!isOpenMenu && (
        <button
          className="fixed top-8 right-8 z-50 rounded bg-black bg-opacity-50 p-2"
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={openMenu}
        >
          <img src={menuIcon} alt="menuIcon" />
        </button>
      )}

      <div className="h-full min-h-screen relative bg-center bg-cover" style={{ backgroundImage: `url(${bgImg})` }}>
        <div
          className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-b"
          style={{
            background: `linear-gradient(to bottom, ${bgFilter.colors[0]}, ${bgFilter.colors[1]})`,
            mixBlendMode: bgFilter.mixBrendMode,
          }}
        />
        {auth.isAuth && (
          <div className="absolute top-0 left-0 z-50 text-white w-full overflow-y-auto">
            <div className="max-h-screen">
              <button className="px-4 py-2 m-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={openNew}>
                作成
              </button>
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
      <Modal isOpen={!auth.isAuth || isOpenMenu || isOpenNew} onClose={closeModal}>
        {!auth.isAuth && <Login />}
        {isOpenMenu && <Menu />}
        {isOpenNew && <New />}
      </Modal>
      <Toaster
        toastOptions={{
          style: { background: 'rgba(0, 0, 0, 0.5)', color: '#fff', padding: '1rem', backdropFilter: 'blur(4px)' },
        }}
      />
    </div>
  );
};
