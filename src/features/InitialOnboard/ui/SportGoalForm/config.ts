import styles from './SportGoalForm.module.scss';

export const sportGoalsGroup: Record<string, string[]> = {
  Спорт: [
    'Похудеть',
    'Накачать мышцы',
    'Увеличить силу',
    'Повысить гибкость',
    'Восстановиться после травмы',
    'Увеличить выносливость',
    'Улучшить результаты',
  ],
  Здоровье: [
    'Улучшить здоровье',
    'Контроль веса',
    'Повысить энергию',
    'Контроль сахара',
    'Улучшить сон',
    'Понизить стресс',
    'Бросить курить',
    'Снизить давление',
  ],
  Питание: [
    'Готовить дома',
    'Меньше сахара',
    'Следовать диете',
    'Контроль порций',
    'Пить больше воды',
    'Больше фруктов/овощей',
    'Сбалансированное питание',
  ],
  Сознание: [
    'Практиковать осознанность',
    'Справиться со стрессом',
    'Управлять депрессией',
    'Повысить уверенность',
    'Снизить тревожность',
    'Укрепить отношения',
    'Улучшить сон',
  ],
};

interface SettingsByCategory {
  color: string;
  buttonsClassName: string;
  activeButtonClassName: string;
}

export const settingsByCategory: Record<string, SettingsByCategory> = {
  Спорт: {
    color: '#BCBD0A',
    buttonsClassName: styles.sportButtons,
    activeButtonClassName: styles.sportButtonsActive,
  },
  Здоровье: {
    color: '#fff',
    buttonsClassName: styles.healthButtons,
    activeButtonClassName: styles.healthButtonsActive,
  },
  Питание: {
    color: '#0069D1',
    buttonsClassName: styles.nutritionButtons,
    activeButtonClassName: styles.nutritionButtonsActive,
  },
  Сознание: {
    color: '#FF4500',
    buttonsClassName: styles.consciousnessButtons,
    activeButtonClassName: styles.consciousnessButtonsActive,
  },
};

export const allCategories = Object.keys(sportGoalsGroup);
