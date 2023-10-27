import { FC } from 'react';

interface Props {
  type: 'submit' | 'reset' | 'button';
  className: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: FC<Props> = ({ type, className, style, onClick, children }) => {
  return (
    <button type={type} className={`px-4 py-2 rounded ${className}`} style={style} onClick={onClick}>
      {children}
    </button>
  );
};
