'use client';

import { confirmTelegramAuth } from 'features/Auth/api';
import { telegramAuth } from 'features/Auth/api';
import { Button, useSnackbar } from 'shared/ui';
import Telegram from './assets/telegram.svg?component';
import styles from './TelegramAuthForm.module.scss';
import { useRouter } from 'next/navigation';
import { TGAuthResult } from 'features/Auth/api/authByTelegram';

export const TelegramLoginButton = () => {
  const router = useRouter();
  const snackbar = useSnackbar();

  const handleTelegramLogin = async () => {
    let userData: TGAuthResult | undefined = undefined;
    const botId = 7593460711;

    if (typeof window !== 'undefined') {
      console.log(window?.Telegram, 'window.Telegram');
    }

    if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const { auth_date, hash, user } = window.Telegram.WebApp.initDataUnsafe;

      userData = {
        auth_date: +auth_date,
        hash,
        first_name: user.first_name,
        ...(user.last_name && { last_name: user.last_name }),
        username: user.username!,
        photo_url: user.photo_url!,
        id: user.id,
      };
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
