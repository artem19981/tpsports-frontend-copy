import React from 'react';

import styles from './MainPageModalMenu.module.scss';
import { MainPageModalMenuItem } from './MainPageModalMenuItem';
import { WithAbsoluteScrollBar } from 'shared/ui';

interface Item<T> {
  title: string;
  icon: React.ReactNode;
  value: T;
  disabled?: boolean;
}

interface Props<T extends string> {
  items: Item<T>[];
  activeValue: T | undefined;

  onClick(category: T): void;
}

export const MainPageModalMenu = <T extends string>({
  items,
  activeValue,
  onClick,
}: Props<T>) => {
  return (
    <WithAbsoluteScrollBar>
      <div className={styles.container}>
        {items.map((category) => (
          <MainPageModalMenuItem
            key={category.value}
            isActive={category.value === activeValue}
            onClick={onClick}
            {...category}
          />
        ))}
      </div>
    </WithAbsoluteScrollBar>
  );
};
