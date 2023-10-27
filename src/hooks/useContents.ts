import { useState, useRef, useCallback } from 'react';

interface UseContents {
  contentsRef: React.MutableRefObject<HTMLDivElement | null>;
  isVisible: boolean;
  handleScroll: () => void;
  scrollToTop: () => void;
}

export const useContents = (): UseContents => {
  const contentsRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = useCallback((): void => {
    if (contentsRef.current !== null) {
      const scrollY = contentsRef.current.scrollTop;
      if (scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, []);

  const scrollToTop = useCallback((): void => {
    if (contentsRef.current !== null) {
      contentsRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, []);

  return { contentsRef, isVisible, handleScroll, scrollToTop };
};
