import { BUTTONS_GROUP_SEPARATOR } from 'shared/ui';
import { strengthTrainingGroup, otherFieldName } from '../config';
import { UserProfile } from 'features/User/model';

const defaultCategory = 'Силовые тренировки';

export const getCategoryByValues = (value: string | null | undefined) => {
  const _value = value || '';
  const values = _value.split(BUTTONS_GROUP_SEPARATOR);
  const firstValue = values[0];

  if (!firstValue) {
    // @todo: выбираем первую категорию
    return defaultCategory;
  }

  const findedValue = Object.entries(strengthTrainingGroup).find(
    ([_, value]) => {
      return value.includes(firstValue);
    }
  );

  return findedValue ? findedValue[0] : defaultCategory;
};

export function getCategories(userProfile: UserProfile): string[] {
  const { favorite_training_types, favorite_training_types_other } =
    userProfile;

  if (!favorite_training_types) {
    return [];
  }

  const inputItems = [
    ...favorite_training_types
      .split(BUTTONS_GROUP_SEPARATOR)
      .map((item) => item.trim()),
    ...(favorite_training_types_other ? [otherFieldName] : []),
  ];

  return Object.keys(strengthTrainingGroup).filter((category) =>
    strengthTrainingGroup[category].some((activity) =>
      inputItems.includes(activity)
    )
  );
}
