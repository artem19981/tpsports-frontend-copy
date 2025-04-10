'use client';

import React from 'react';

import { MainLayout } from 'app/Layouts';
import { Login } from 'widgets/Login';

import styles from './LoginPage.module.css';
import { useRouter } from 'next/navigation';

export const LoginPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      withUserMenu={false}
      headerClassName={styles.header}
      containerClassName={styles.layout}
      childrenClassName={styles.children}
      onCrossClick={() => router.push('/ai')}
    >
      <Login />
    </MainLayout>
  );
};
