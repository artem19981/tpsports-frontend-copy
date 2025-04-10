import React from 'react';
import { Divider } from '@mui/material';
import styles from './TelegramAuthForm.module.scss';
import { TelegramLoginButton } from './TelegramLoginButton';

export const TelegramAuthForm = () => {
  return (
    <div className={styles.container}>
      <Divider className={styles.divider}>или</Divider>

      <TelegramLoginButton />
    </div>
  );
};
