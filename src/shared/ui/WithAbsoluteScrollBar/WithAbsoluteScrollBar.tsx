import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React from 'react';
import styles from './WithAbsoluteScrollBar.module.scss';

interface Props {
  children: React.ReactNode;
}

export const WithAbsoluteScrollBar = ({ children }: Props) => {
  return (
    <OverlayScrollbarsComponent
      defer
      options={{ scrollbars: { autoHide: 'leave' } }}
      className={styles.content}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
};
