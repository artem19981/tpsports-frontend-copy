'use client';

import { loginAfterConfirmRegistration } from 'features/Auth/api';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect } from 'react';
import { Loader } from 'shared/ui';
import styles from './RegistrationConfirmPage.module.scss';

export const RedirectToPage = ({ token }: { token: string }) => {
  const router = useRouter();

  useLayoutEffect(() => {
    loginAfterConfirmRegistration(token).then(() => {
      router.push('/ai');
    });
  }, []);

  return (
    <div className={styles.root}>
      <Loader />
    </div>
  );
};
