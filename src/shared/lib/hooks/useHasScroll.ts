import { useState, useEffect, useRef, RefObject } from 'react';

export const useHasScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);
  const [hasScroll, setHasScroll] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (ref.current) {
        const { scrollHeight, clientHeight, scrollWidth, clientWidth } =
          ref.current;
        setHasScroll(scrollHeight > clientHeight || scrollWidth > clientWidth);
      }
    };

    const observer = new ResizeObserver(checkScroll);
    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, hasScroll };
};
