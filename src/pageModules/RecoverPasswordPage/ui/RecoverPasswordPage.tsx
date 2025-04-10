'use client';

import React from 'react';

import { MainLayout } from 'app/Layouts';
import { RecoverPassword } from 'widgets/RecoverPassword';

import styles from './RecoverPasswordPage.module.scss';
import { useRouter } from 'next/navigation';

export const RecoverPasswordPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      withUserMenu={false}
      headerClassName={styles.header}
      childrenClassName={styles.children}
      onCrossClick={() => router.push('/ai')}
    >
      <RecoverPassword />
    </MainLayout>
  );
};
