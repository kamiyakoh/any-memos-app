import { FC } from 'react';

interface Props {
  type: 'submit' | 'reset' | 'button';
  className: string;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: FC<Props> = ({ type, className, onClick, children }) => {
  return (
    <button type={type} className={`px-4 py-2 rounded ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
