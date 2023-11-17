import { FC, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useContents } from '../../hooks/useContents';
import { ScrollToTopButton } from '../uiParts/ScrollToTopButton';
import { Memos } from '../projects/Memos';

interface Props {
  isShowBgPreview: boolean;
  onClickShowBgPreview: () => void;
}

export const Contents: FC<Props> = ({ isShowBgPreview, onClickShowBgPreview }) => {
  const { contentsRef, isVisible, handleScroll, scrollToTop } = useContents();

  useEffect(() => {
    const contentsRefCurrent = contentsRef.current;

    if (contentsRefCurrent !== null) {
      contentsRefCurrent.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (contentsRefCurrent !== null) {
        contentsRefCurrent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [contentsRef, handleScroll]);

  return (
    <div
      ref={contentsRef}
      className={`absolute top-0 left-0 z-40 text-white w-full overflow-y-auto  ${isShowBgPreview ? 'hidden' : ''}`}
    >
      <div className="max-h-screen pt-[5.5rem]">
        <ErrorBoundary
          fallback={
            <div className="flex justify-center">
              <p className="bg-black bg-opacity-50 rounded p-4 mb4" style={{ backdropFilter: 'blur(4px)' }}>
                メモデータを読み込みに失敗しました
              </p>
            </div>
          }
        >
          <Suspense
            fallback={
              <div className="flex justify-center">
                <p className="bg-black bg-opacity-50 rounded p-4 mb4" style={{ backdropFilter: 'blur(4px)' }}>
                  メモデータを読み込み中...
                </p>
              </div>
            }
          >
            <Memos isShowBgPreview={isShowBgPreview} onClickShowBgPreview={onClickShowBgPreview} />
          </Suspense>
        </ErrorBoundary>
      </div>
      <ScrollToTopButton
        className={`fixed bottom-4 right-4 z-40 min-[1936px]:right-[calc((100%_-_1920px)_/_2)] ${
          isVisible ? 'block' : 'hidden'
        }`}
        onClick={scrollToTop}
      />
    </div>
  );
};
