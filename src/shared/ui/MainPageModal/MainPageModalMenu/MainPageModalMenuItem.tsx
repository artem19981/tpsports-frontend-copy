import React, { ReactNode } from 'react';
import styles from './MainPageModalMenu.module.scss';
import classNames from 'classnames';
import { Stack } from '@mui/material';

interface Props {
  title: string;
  icon: ReactNode;
  isActive: boolean;
  value: any;

  disabled?: boolean;

  onClick(value: any): void;
}

export const MainPageModalMenuItem = ({
  title,
  icon,
  isActive,
  disabled,
  value,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() => (disabled ? undefined : onClick(value))}
      className={classNames(styles.category, {
        [styles.disabledCategory]: disabled,
      })}
    >
      <Stack style={{ color: isActive ? '#00FF3B' : '#fff' }}>{icon}</Stack>

      <p className={styles.categoryTitle}>{title}</p>

      {isActive && <div className={styles.activeLine} />}
    </div>
  );
};
