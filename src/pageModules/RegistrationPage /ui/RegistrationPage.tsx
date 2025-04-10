'use client';

import React from 'react';

import { MainLayout } from 'app/Layouts';
import { Registration } from 'widgets/Registration';

import styles from './RegistrationPage.module.css';
import { useRouter } from 'next/navigation';

export const RegistrationPage = () => {
  const router = useRouter();

  return (
    <MainLayout
      withUserMenu={false}
      headerClassName={styles.header}
      childrenClassName={styles.content}
      containerClassName={styles.layout}
      onCrossClick={() => router.push('/ai')}
    >
      <Registration />
    </MainLayout>
  );
};
