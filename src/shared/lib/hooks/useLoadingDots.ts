import { useEffect, useState } from 'react';

export const useLoadingDots = (
  string: string,
  condition: boolean,
  duration = 350
) => {
  const [loadingString, setLoadingString] = useState(string);

  useEffect(() => {
    if (!condition) {
      return;
    }

    const interval = setInterval(() => {
      setLoadingString((prev) => {
        const dotCount = (prev.match(/\./g) || []).length;

        return dotCount < 3 ? `${prev}.` : string;
      });
    }, duration);

    return () => clearInterval(interval);
  }, [duration, condition]);

  return loadingString;
};
