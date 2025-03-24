import React from 'react';
import { ToggleButton } from 'shared/ui';
import styles from '../StrengthTrainingForm.module.scss';

export function CategoriesSwipe({ isActive, value, onClick }: any) {
  return (
    <ToggleButton
      isActive={isActive}
      value={value}
      onClick={() => onClick(value)}
      className={styles.toggleButton}
    />
  );
}
