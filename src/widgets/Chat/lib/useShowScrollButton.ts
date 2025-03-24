// import { debounce } from 'lodash';
import throttle from 'lodash/throttle';
import { RefObject, useEffect, useRef, useState } from 'react';

export const useShowScrollButton = (messagesRef: RefObject<HTMLDivElement>) => {
  const [showButton, setShowButton] = useState(false);
  const observer = useRef<MutationObserver | null>(null);

  useEffect(() => {
    const checkScroll = throttle(() => {
      if (messagesRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;
        setShowButton(scrollTop + clientHeight < scrollHeight - 10);
      }
    }, 500);

    if (messagesRef.current) {
      observer.current = new MutationObserver(() => {
        checkScroll();
      });
      observer.current.observe(messagesRef.current, {
        childList: true,
        subtree: true,
      });

      messagesRef.current.addEventListener('scroll', checkScroll);
    }

    return () => {
      observer.current?.disconnect();
      messagesRef.current?.removeEventListener('scroll', checkScroll);
    };
  }, []);

  return showButton;
};
