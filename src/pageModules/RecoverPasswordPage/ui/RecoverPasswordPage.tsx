import React from 'react';

import { MainLayout } from 'app/Layouts';
import { RecoverPassword } from 'widgets/RecoverPassword';

import styles from './RecoverPasswordPage.module.scss';

export const RecoverPasswordPage = () => {
  return (
    <MainLayout
      withUserMenu={false}
      headerClassName={styles.header}
      childrenClassName={styles.children}
    >
      <RecoverPassword />
    </MainLayout>
  );
};
