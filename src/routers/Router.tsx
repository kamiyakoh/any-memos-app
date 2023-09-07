import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../components/pages/Dashboard';
// import { Login } from '../components/pages/Login';
// import { Exam } from '../components/pages/Exam';
// import { Memos } from '../components/pages/Memos';

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};
