// types/telegram.d.ts
export {};

declare global {
  interface Window {
    Telegram?: TelegramNamespace;
  }

  interface TelegramNamespace {
    WebApp: TelegramWebApp;
  }

  interface TelegramWebApp {
    initData: string;
    initDataUnsafe: {
      user: TelegramUser;
      chat?: any;
      [key: string]: any;
    };
    version: string;
    platform: string;
    isExpanded: boolean;
    isClosingConfirmationEnabled: boolean;
    themeParams: {
      [key: string]: string;
    };
    headerColor: string;
    backgroundColor: string;
    colorScheme: 'light' | 'dark' | 'auto';

    expand(): void;
    close(): void;
    ready(): void;
    sendData(data: string): void;
    openLink(url: string): void;
    enableClosingConfirmation(): void;
    disableClosingConfirmation(): void;
    onEvent(eventType: string, callback: Function): void;
    offEvent(eventType: string, callback: Function): void;
  }

  interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: boolean;
    photo_url?: string;
  }
}
