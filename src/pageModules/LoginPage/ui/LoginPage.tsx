import React from 'react';

import { MainLayout } from 'app/Layouts';
import { Login } from 'widgets/Login';

import styles from './LoginPage.module.css';

export const LoginPage = () => {
  return (
    <MainLayout
      withUserMenu={false}
      headerClassName={styles.header}
      containerClassName={styles.layout}
      childrenClassName={styles.children}
    >
      <Login />
    </MainLayout>
  );
};
