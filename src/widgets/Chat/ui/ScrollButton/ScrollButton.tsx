import React from 'react';

import Arrow from '@/app/assets/images/aiChat/arrow.svg?component';
import styles from './ScrollButton.module.scss';

export const ScrollButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.button} onClick={onClick}>
      <Arrow height={12} width={12} />
    </div>
  );
};
