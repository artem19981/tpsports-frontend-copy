import { useEffect, useRef, useState } from 'react';

export const useFadeScroll = <T extends HTMLElement>(
  timeout: number = 3000,
  hideScrollClassName: string = 'hide-scroll'
) => {
  const [isScrollVisible, setScrollVisible] = useState<boolean>(true);
  const scrollRef = useRef<T | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleActivity = () => {
      setScrollVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setScrollVisible(false), timeout);
    };

    // Слушаем события прокрутки и движения мыши
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleActivity);
      scrollRef.current.addEventListener('mousemove', handleActivity);
    }

    // Инициализация таймера при монтировании
    timer = setTimeout(() => setScrollVisible(false), timeout);

    // Очистка
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleActivity);
        scrollRef.current.removeEventListener('mousemove', handleActivity);
      }
      clearTimeout(timer);
    };
  }, [timeout]);

  // Добавляем или удаляем класс для скрытия скроллбара
  useEffect(() => {
    if (scrollRef.current) {
      if (isScrollVisible) {
        scrollRef.current.classList.remove(hideScrollClassName);
      } else {
        scrollRef.current.classList.add(hideScrollClassName);
      }
    }
  }, [isScrollVisible]);

  return scrollRef;
};
