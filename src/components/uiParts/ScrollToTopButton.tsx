import { FC } from 'react';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

export const ScrollToTopButton: FC<Props> = ({ className, style, onClick }) => {
  return (
    <button className={className} style={style} onClick={onClick}>
      <span
        className="inline-block relative top-2 p-6 border-[1px] bg-black  bg-opacity-50 border-solid border-white rounded-full before:absolute before:top-[1.1rem] before:left-3 before:w-6 before:h-6 before:border-solid before:border-t-2 before:border-r-2 before:border-white before:rotate-[-45deg]"
        style={{ backdropFilter: 'blur(4px)' }}
      />
    </button>
  );
};
