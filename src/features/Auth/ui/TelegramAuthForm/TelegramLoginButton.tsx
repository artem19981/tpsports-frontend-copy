'use client';

import { confirmTelegramAuth } from 'features/Auth/api';
import { telegramAuth } from 'features/Auth/api';
import { Button, useSnackbar } from 'shared/ui';
import Telegram from './assets/telegram.svg?component';
import styles from './TelegramAuthForm.module.scss';
import { useRouter } from 'next/navigation';

export const TelegramLoginButton = () => {
  const router = useRouter();
  const snackbar = useSnackbar();

  const handleTelegramLogin = async () => {
    let userData = undefined;
    const botId = 8188766801;

    if (typeof window !== 'undefined') {
      console.log(window?.Telegram, 'window.Telegram');
    }

    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initData) {
      userData = window.Telegram.WebApp.initData;
    } else {
      userData = await telegramAuth(botId.toString(), {
        windowFeatures: { width: 500, height: 600, popup: true },
      });
    }

    console.log(userData, 'userData');

    const data = await confirmTelegramAuth(userData);

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
