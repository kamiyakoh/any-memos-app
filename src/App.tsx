import { FC, useEffect } from 'react';
import { worker } from './serviceWorker';
// import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
// import { Router } from './routers/Router';
import { Modal } from './components/projects/Modal';
import { Login } from './components/projects/Login';
import { Menu } from './components/projects/Menu';
import { New } from './components/projects/New';
import { useApp } from './hooks/useApp';
import { useHandleModal } from './hooks/useHandleModal';
import { useLogin } from './hooks/useLogin';
import menuIcon from './assets/img/menuIcon.png';

// モックサービスワーカーを起動
worker.start(); // eslint-disable-line @typescript-eslint/no-floating-promises

export const App: FC = () => {
  const { bgImg, bgFilter } = useApp();
  const { isOpenMenu, isOpenNew, openMenu, openNew, closeModal } = useHandleModal();
  const { isAuth, fetchIsAuth } = useLogin();

  useEffect(() => {
    fetchIsAuth();
  }, [fetchIsAuth]);

  return (
    <div>
      {!isOpenMenu && (
        <button
          className="fixed top-8 right-8 z-50 bg-black bg-opacity-50 p-2"
          style={{ backdropFilter: 'blur(4px)' }}
          onClick={openMenu}
        >
          <img src={menuIcon} alt="menuIcon" />
        </button>
      )}
      {isAuth && (
        <div className="absolute top-0 left-0 z-50">
          <button className="px-4 py-2 m-4 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={openNew}>
            作成
          </button>
        </div>
      )}
      <div className="h-screen relative bg-center bg-cover bg-no-repeat" style={{ background: `url(${bgImg})` }}>
        <div
          className="absolute top-0 left-0 z-0 w-full h-full bg-gradient-to-b"
          style={{
            background: `linear-gradient(to bottom, ${bgFilter.colors[0]}, ${bgFilter.colors[1]})`,
            mixBlendMode: bgFilter.mixBrendMode,
          }}
        />
      </div>
      <Modal isOpen={!isAuth || isOpenMenu || isOpenNew} onClose={closeModal}>
        {!isAuth && <Login />}
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
