'use client';

import { confirmTelegramAuth } from 'features/Auth/api';
import { telegramAuth } from 'features/Auth/api';
import { Button } from 'shared/ui';

export const TelegramLogin2 = () => {
  const handleTelegramLogin = async () => {
    const botId = 8188766801;

    const result = await telegramAuth(botId.toString(), {
      windowFeatures: { width: 500, height: 600, popup: true },
    });

    console.log(result, 'result');

    await confirmTelegramAuth(result);
  };

  return <Button onClick={handleTelegramLogin}>Войти через Telegram</Button>;
};
