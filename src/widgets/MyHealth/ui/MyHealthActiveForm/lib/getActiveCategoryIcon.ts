import {
  getMyHealthCategories,
  MyHealthCategory,
} from 'entities/onboarding/ui';

export const getActiveCategoryIcon = (
  isMan: boolean,
  activeCategory: MyHealthCategory | undefined
) => {
  if (!activeCategory) {
    return;
  }

  const categories = getMyHealthCategories(isMan);

  return categories.find((category) => category.category === activeCategory)
    ?.icon;
};
