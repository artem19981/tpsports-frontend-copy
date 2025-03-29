import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import ExitImg from '@/app/assets/images/aiChat/menu/menu-exit.svg?component';
import PlanImg from '@/app/assets/images/aiChat/menu/menu-plan.svg?component';
import ProfileImg from '@/app/assets/images/aiChat/menu/menu-profile.svg?component';
import SettingsImg from '@/app/assets/images/aiChat/menu/menu-settings.svg?component';

export const getMenuItems = (
  onExit: () => void,
  router: AppRouterInstance,
  showHealth: () => void,
  openUserSettings: () => void
) => [
  {
    icon: <ProfileImg />,
    label: 'Моё здоровье',
    onClick: showHealth,
  },
  {
    icon: <PlanImg />,
    label: 'Мой план',
    onClick: () => router.push('/plan'),
  },
  {
    icon: <SettingsImg />,
    label: 'Аккаунт TPS',
    onClick: openUserSettings,
  },
  {
    icon: <ExitImg />,
    label: 'Выход',
    onClick: onExit,
  },
];
