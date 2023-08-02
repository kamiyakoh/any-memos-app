// App.tsx
import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routers/Router';
import { worker } from './serviceWorker';

// モックサービスワーカーを起動
worker.start();

export const App: FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};
