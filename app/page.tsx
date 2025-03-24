import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'TPS Ассистенты - умные ИИ помощники для спорта',
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

export default function Home() {
  redirect('/ai');
}
