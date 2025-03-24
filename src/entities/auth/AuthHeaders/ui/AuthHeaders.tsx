import React from 'react';

import styles from './AuthHeaders.module.scss';

interface Props {
  title: string;
  subtitle: string;
}

export const AuthHeaders = ({ title, subtitle }: Props) => {
  return (
    <div>
      <h4 className={styles.title}>{title}</h4>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
};
