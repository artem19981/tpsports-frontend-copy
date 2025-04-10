'use client';

import React from 'react';

import { MainLayout } from 'app/Layouts';
import { ChangePassword } from 'widgets/ChangePassword';
import { useRouter } from 'next/navigation';

import styles from './ChangePasswordPage.module.css';

interface Props {
  token: string | undefined;
}

export const ChangePasswordPage = ({ token }: Props) => {
  const router = useRouter();

  return (
    <MainLayout
      withUserMenu={false}
      headerClassName={styles.header}
      childrenClassName={styles.content}
      onCrossClick={() => router.push('/ai')}
    >
      <ChangePassword token={token} />
    </MainLayout>
  );
};
