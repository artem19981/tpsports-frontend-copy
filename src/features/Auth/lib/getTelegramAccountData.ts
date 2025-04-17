import { isTelegramWebApp } from 'shared/lib/isTelegramWebApp';
import { telegramAuth } from '../api';

export const getTelegramAccountData = async () => {
  const botId = 7593460711;

  if (typeof window !== 'undefined') {
    console.log(window?.Telegram, 'window.Telegram');
  }

  console.log(window.Telegram?.WebApp?.initDataUnsafe?.user, 'window.Telegram');
  if (typeof window !== 'undefined' && isTelegramWebApp()) {
    const { auth_date, hash, user } = window.Telegram!.WebApp.initDataUnsafe;

    return {
      init_data: window.Telegram!.WebApp.initData,
      auth_date: +auth_date,
      hash,
      first_name: user.first_name,
      ...(user.last_name && { last_name: user.last_name }),
      username: user.username!,
      photo_url: user.photo_url!,
      id: user.id,
    };
  } else {
    const userData = await telegramAuth(botId.toString(), {
      windowFeatures: { width: 500, height: 600, popup: true },
    });

    return userData;
  }
};
