import React from 'react';

import { MainLayout } from 'app/Layouts';
import { ChangePassword } from 'widgets/ChangePassword';

import styles from './ChangePasswordPage.module.css';

interface Props {
  token: string | undefined;
}

export const ChangePasswordPage = ({ token }: Props) => {
  return (
    <MainLayout
      withUserMenu={false}
      headerClassName={styles.header}
      childrenClassName={styles.content}
    >
      <ChangePassword token={token} />
    </MainLayout>
  );
};
