import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Dashboard: FC = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <nav>
        <Link to="/New">Create</Link>
        <Link to="/Memos">Memos</Link>
      </nav>
    </div>
  );
};
