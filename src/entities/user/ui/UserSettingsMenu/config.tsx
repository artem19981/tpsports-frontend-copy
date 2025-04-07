import PersonalInfo from './assets/personalInfo.svg?component';
import ChangePassword from './assets/changePassword.svg?component';
import PricingPlan from './assets/pricingPlans.svg?component';
import Exit from './assets/exit.svg?component';

import { UserSettingsMenuItem } from './types';

export const userSettingsMenuItems = [
  {
    title: 'Личная информация',
    icon: <PersonalInfo width={24} height={24} />,
    value: UserSettingsMenuItem.PersonalInfo,
  },
  {
    title: 'Изменить пароль',
    icon: <ChangePassword width={24} height={24} />,
    value: UserSettingsMenuItem.ChangePassword,
  },
  {
    title: 'Мой тариф',
    icon: <PricingPlan width={22} height={22} />,
    value: UserSettingsMenuItem.PricingPlan,
  },
  {
    title: 'Выход',
    icon: <Exit width={24} height={24} />,
    value: UserSettingsMenuItem.Exit,
  },
];
