import { Metadata } from 'next';
import { AiPage } from 'pageModules/AiPage';

export const metadata: Metadata = {
  title: 'Your Experts, on AI',
  // icons: [
  //   {
  //     rel: 'apple-touch-icon',
  //     sizes: '180x180',
  //     url: '/greenFavicon.png',
  //     type: 'image/png',
  //   },
  //   {
  //     rel: 'icon',
  //     sizes: '180x180',
  //     url: '/greenFavicon.svg',
  //     type: 'image/svg+xml',
  //   },
  //   {
  //     rel: 'icon',
  //     sizes: '180x180',
  //     url: '/greenFavicon.png',
  //     type: 'image/png',
  //   },
  // ],
};

export default async function Ai() {
  return <AiPage />;
}
