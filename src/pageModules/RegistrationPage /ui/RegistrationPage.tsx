import React from 'react';

import { MainLayout } from 'app/Layouts';
import { Registration } from 'widgets/Registration';

import styles from './RegistrationPage.module.css';

export const RegistrationPage = () => {
  return (
    <MainLayout
      withUserMenu={false}
      headerClassName={styles.header}
      childrenClassName={styles.content}
      containerClassName={styles.layout}
      contentClassName={styles.content}
    >
      <Registration />
    </MainLayout>
  );
};
