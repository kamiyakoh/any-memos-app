import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from '../components/pages/Dashboard';
import { Login } from '../components/projects/Login';

export const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};
