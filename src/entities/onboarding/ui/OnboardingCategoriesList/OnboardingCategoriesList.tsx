import React, { useMemo } from 'react';
import { getMyHealthCategories } from './config';
import { MyHealthCategory } from './types';

import styles from './OnboardingCategoriesList.module.scss';
import { OnboardingCategory } from './OnboardingCategory';
import { WithAbsoluteScrollBar } from 'shared/ui';

interface Props {
  isMan: boolean;
  activeCategory: MyHealthCategory | undefined;

  onClick(category: MyHealthCategory): void;
}

export const OnboardingCategoriesList = ({
  isMan,
  activeCategory,
  onClick,
}: Props) => {
  const categories = useMemo(() => getMyHealthCategories(isMan), [isMan]);

  return (
    <WithAbsoluteScrollBar>
      <div className={styles.container}>
        {categories.map((category) => (
          <OnboardingCategory
            key={category.category}
            isActive={category.category === activeCategory}
            onClick={onClick}
            {...category}
          />
        ))}
      </div>
    </WithAbsoluteScrollBar>
  );
};
