import React from 'react';

import { Typography } from '@mui/material';

import { MainLayout } from 'app/Layouts';
import {
  UserSettingsActions,
  UserSettingsChangePasswordForm,
  UserSettingsForm,
} from 'features/User';
import { getUserProfile } from 'features/User/api';
import { redirect } from 'next/navigation';

import styles from './UserSettingsPage.module.scss';

export const UserSettingsPage = async () => {
  const userData = await getUserProfile().catch(() => null);

  if (!userData) {
    redirect('/ai');
  }

  return (
    <MainLayout
      containerClassName={styles.layout}
      headerClassName={styles.header}
      contentClassName={styles.content}
      childrenClassName={styles.children}
    >
      <div className={styles.container}>
        <div>
          <Typography className={styles.title}>Настройки</Typography>
          <UserSettingsForm userData={userData} />
        </div>

        <div>
          <Typography className={styles.title}>Изменить пароль</Typography>
          <UserSettingsChangePasswordForm />
        </div>

        <UserSettingsActions />
      </div>
    </MainLayout>
  );
};
