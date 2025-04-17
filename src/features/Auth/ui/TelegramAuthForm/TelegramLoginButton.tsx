'use client';

import { authByTelegramInWebApp, confirmTelegramAuth } from 'features/Auth/api';
import { Button, useSnackbar } from 'shared/ui';
import Telegram from '@/app/assets/images/common/telegram.svg?component';
import styles from './TelegramAuthForm.module.scss';
import { useRouter } from 'next/navigation';
import { getTelegramAccountData } from 'features/Auth/lib';
import { isTelegramWebApp } from 'shared/lib/isTelegramWebApp';

export const TelegramLoginButton = () => {
  const router = useRouter();
  const snackbar = useSnackbar();

  const handleTelegramLogin = async () => {
    const tgAccountData = await getTelegramAccountData();

    const isWebApp = isTelegramWebApp();

    const data = isWebApp
      ? await authByTelegramInWebApp(tgAccountData)
      : await confirmTelegramAuth(tgAccountData);

    if (typeof data === 'string') {
      snackbar('Не удалось авторизоваться, попробуйте позже', 'error');
    } else {
      router.replace('/ai');
    }
  };

  return (
    <Button
      className={styles.button}
      onClick={handleTelegramLogin}
      startIcon={<Telegram width={24} height={24} />}
      variant="transparent"
    >
      Войти через Telegram
    </Button>
  );
};
