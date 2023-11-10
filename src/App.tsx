import { FC, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useApp } from './hooks/useApp';
import { useLogin } from './hooks/useLogin';
import { useMenu } from './hooks/useMenu';
import { worker } from './serviceWorker';
import { Modal } from './components/uiParts/Modal';
import { Login } from './components/projects/Login';
import { Contents } from './components/pages/Contents';

worker.start(); // eslint-disable-line @typescript-eslint/no-floating-promises

export const App: FC = () => {
  const { bgImg, bgFilter } = useApp();
  const { isAuth, isLoading, fetchIsAuth } = useLogin();
  const { isShowBgPreview, onClickCloseBgPreview } = useMenu();

  useEffect(() => {
    fetchIsAuth();
  }, [fetchIsAuth]);

  return (
    <div>
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
      {!isLoading && !isAuth && (
        <Modal selectedModal="login">
          <Login />
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
