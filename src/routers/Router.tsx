import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { Login } from '../components/pages/Login';
import { Memos } from '../components/pages/Memos';

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Memos />} />
    </Routes>
  );
};
