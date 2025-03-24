import { memo } from 'react';

export const genericMemo: <T>(
  component: T,
  propsAreEqual?: (prevProps: React.PropsWithChildren<T>, nextProps: React.PropsWithChildren<T>) => boolean,
) => T & { displayName?: string } = memo;
