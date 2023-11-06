import { FC, Suspense, useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useMenu } from '../../hooks/useMenu';
import { useContents } from '../../hooks/useContents';
import { ScrollToTopButton } from '../uiParts/ScrollToTopButton';
import { Memos } from '../projects/Memos';
import { Category } from '../../components/projects/Category';

export const Contents: FC = () => {
  const { contentsRef, isVisible, handleScroll, scrollToTop } = useContents();
  const { isShowBgPreview } = useMenu();

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
            <Memos />
            <Category />
          </Suspense>
        </ErrorBoundary>
      </div>
      <ScrollToTopButton
        className={`fixed bottom-4 right-4 z-50 min-[1936px]:right-[calc((100%_-_1920px)_/_2)] ${
          isVisible ? 'block' : 'hidden'
        }`}
        onClick={scrollToTop}
      />
    </div>
  );
};
