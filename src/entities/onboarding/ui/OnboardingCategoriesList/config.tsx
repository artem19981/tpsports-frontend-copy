import BodyMeasurements from './assets/bodyMeasurements.svg?component';
import Goals from './assets/goals.svg?component';
import SportAndActivity from './assets/sportAndActivity.svg?component';
import WomenHealth from './assets/womenHealth.svg?component';
import Lifestyle from './assets/lifestyle.svg?component';
import Food from './assets/food.svg?component';
import MentalHealth from './assets/mentalHealth.svg?component';
import OrgansAndSystems from './assets/organsAndSystems.svg?component';

import { MyHealthCategory } from './types';

export const getMyHealthCategories = (isMan: boolean) => [
  {
    title: 'Измерения тела',
    icon: <BodyMeasurements width={24} height={24} />,
    value: MyHealthCategory.BodyMeasurements,
  },
  {
    title: 'Активность',
    icon: <SportAndActivity width={24} height={24} />,
    value: MyHealthCategory.SportAndActivity,
  },
  {
    title: 'Спорт',
    icon: <SportAndActivity width={24} height={24} />,
    value: MyHealthCategory.Training,
  },
  {
    title: 'Цели',
    icon: <Goals width={24} height={24} />,
    value: MyHealthCategory.Goals,
  },
  {
    title: 'Образ жизни',
    icon: <Lifestyle width={24} height={24} />,
    value: MyHealthCategory.Lifestyle,
  },
  {
    title: 'Питание',
    icon: <Food width={24} height={24} />,
    value: MyHealthCategory.Food,
  },
  {
    title: 'Ментальное здоровье',
    icon: <MentalHealth width={24} height={24} />,
    value: MyHealthCategory.MentalHealth,
  },
  {
    title: 'Женское здоровье',
    icon: <WomenHealth width={24} height={24} />,
    disabled: isMan,
    value: MyHealthCategory.WomenHealth,
  },
  {
    title: 'Органы и системы',
    icon: <OrgansAndSystems width={24} height={24} />,
    value: MyHealthCategory.OrgansAndSystems,
  },
];
