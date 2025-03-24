import { Providers } from 'app/providers';
import type { Metadata } from 'next';
import localFont from 'next/font/local';

import 'overlayscrollbars/overlayscrollbars.css';
import './globals.css';
import classNames from 'classnames';

const neumachineFont = localFont({
  src: [
    {
      path: 'fonts/NeueMachina-Regular.woff2',
      weight: '400',
    },
  ],
  variable: '--NeueMachina',
});

const gilroyFont = localFont({
  src: [
    {
      path: 'fonts/gilroy-regular.ttf',
      weight: '400',
    },
    {
      path: 'fonts/gilroy-bold.otf',
      weight: '700',
    },
  ],
  variable: '--gilroy',
});

export const metadata: Metadata = {
  title: 'Your Experts, on AI',
  description: 'TPS Ассистенты — умные ИИ помощники для спорта',
  icons: [
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/favicon.png',
      type: 'image/png',
    },
    {
      rel: 'icon',
      sizes: '180x180',
      url: '/favicon.svg',
      type: 'image/svg+xml',
    },
    {
      rel: 'icon',
      sizes: '180x180',
      url: '/favicon.png',
      type: 'image/png',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <Providers>
        <body
          className={classNames(
            neumachineFont.variable,
            gilroyFont.variable,
            'antialiased'
          )}
        >
          {children}
        </body>
      </Providers>
    </html>
  );
}
