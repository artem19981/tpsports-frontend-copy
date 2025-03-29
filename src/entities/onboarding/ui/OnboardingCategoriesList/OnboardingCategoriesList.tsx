import React, { useMemo } from 'react';
import { getMyHealthCategories } from './config';
import { MyHealthCategory } from './types';

import { MainPageModalMenu } from 'shared/ui';

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
    <MainPageModalMenu
      items={categories}
      activeValue={activeCategory}
      onClick={onClick}
    />
  );
};
