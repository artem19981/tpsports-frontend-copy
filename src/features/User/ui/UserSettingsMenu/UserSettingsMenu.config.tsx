import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import ExitImg from '@/app/assets/images/aiChat/menu/menu-exit.svg?component';
import PlanImg from '@/app/assets/images/aiChat/menu/menu-plan.svg?component';
import ProfileImg from '@/app/assets/images/aiChat/menu/menu-profile.svg?component';
import SettingsImg from '@/app/assets/images/aiChat/menu/menu-settings.svg?component';

export const getMenuItems = (
  onExit: () => void,
  router: AppRouterInstance,
  showHealth: () => void
) => [
  {
    icon: <ProfileImg />,
    label: 'Моё здоровье',
    onClick: () => showHealth(),
  },
  {
    icon: <PlanImg />,
    label: 'Мой план',
    onClick: () => router.push('/plan'),
  },
  {
    icon: <SettingsImg />,
    label: 'Настройки',
    onClick: () => router.push('/user-settings'),
  },
  {
    icon: <ExitImg />,
    label: 'Выход',
    onClick: onExit,
  },
];
