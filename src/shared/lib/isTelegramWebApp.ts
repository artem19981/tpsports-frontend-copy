export const isTelegramWebApp = () =>
  typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user;
