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
    category: MyHealthCategory.BodyMeasurements,
  },
  {
    title: 'Спорт и активность',
    icon: <SportAndActivity width={24} height={24} />,
    category: MyHealthCategory.SportAndActivity,
  },
  {
    title: 'Тренировки',
    icon: <SportAndActivity width={24} height={24} />,
    category: MyHealthCategory.Training,
  },
  {
    title: 'Цели',
    icon: <Goals width={24} height={24} />,
    category: MyHealthCategory.Goals,
  },
  {
    title: 'Образ жизни',
    icon: <Lifestyle width={24} height={24} />,
    category: MyHealthCategory.Lifestyle,
  },
  {
    title: 'Питание',
    icon: <Food width={24} height={24} />,
    category: MyHealthCategory.Food,
  },
  {
    title: 'Ментальное здоровье',
    icon: <MentalHealth width={24} height={24} />,
    category: MyHealthCategory.MentalHealth,
  },
  {
    title: 'Женское здоровье',
    icon: <WomenHealth width={24} height={24} />,
    disabled: isMan,
    category: MyHealthCategory.WomenHealth,
  },
  {
    title: 'Органы и системы',
    icon: <OrgansAndSystems width={24} height={24} />,
    category: MyHealthCategory.OrgansAndSystems,
  },
];
