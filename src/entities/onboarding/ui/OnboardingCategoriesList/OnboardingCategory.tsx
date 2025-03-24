import React, { ReactNode } from 'react';
import styles from './OnboardingCategoriesList.module.scss';
import classNames from 'classnames';
import { MyHealthCategory } from './types';
import { Stack } from '@mui/material';

interface Props {
  title: string;
  icon: ReactNode;
  isActive: boolean;
  category: MyHealthCategory;

  disabled?: boolean;

  onClick(category: MyHealthCategory): void;
}

export const OnboardingCategory = ({
  title,
  icon,
  isActive,
  disabled,
  category,
  onClick,
}: Props) => {
  return (
    <div
      onClick={() => (disabled ? undefined : onClick(category))}
      className={classNames(styles.category, {
        [styles.disabledCategory]: disabled,
      })}
    >
      <Stack style={{ color: isActive ? '#00FF3B' : '#fff' }}>{icon}</Stack>

      <p className={styles.categoryTitle}>{title}</p>
    </div>
  );
};
