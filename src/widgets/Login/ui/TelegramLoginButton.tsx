'use client';

import { confirmTelegramAuth } from 'features/Auth/api';
import { telegramAuth } from 'features/Auth/api';
import { Button } from 'shared/ui';

export const TelegramLoginButton = () => {
  const handleTelegramLogin = async () => {
    let userData = undefined;
    const botId = 8188766801;

    if (typeof window !== 'undefined') {
      console.log(window?.Telegram, 'window.Telegram');
    }

    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
      userData = window.Telegram.WebApp.initData;
    } else {
      userData = await telegramAuth(botId.toString(), {
        windowFeatures: { width: 500, height: 600, popup: true },
      });
    }

    await confirmTelegramAuth(userData);
  };

  return <Button onClick={handleTelegramLogin}>Войти через Telegram</Button>;
};
