import { getUserProfile } from 'features/User/api';
import { Metadata } from 'next';
import { InitialOnboard } from 'pageModules/InitialOnboard/ui/InitialOnboard';

export const metadata: Metadata = {
  title: 'TPS Ассистенты - умные ИИ помощники для спорта',
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

export default async function Onboarding(props: any) {
  const userProfile = await getUserProfile();

  if (userProfile.is_completed) {
    // Перенаправление на клиенте, т.к. редирект в RSC не работает
    // return <meta httpEquiv="refresh" content="0;url=/ai" />;
  }

  return (
    <InitialOnboard step={props.searchParams.step} userProfile={userProfile} />
  );
}
