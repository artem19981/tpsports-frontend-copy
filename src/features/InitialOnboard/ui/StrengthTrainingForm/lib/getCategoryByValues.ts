import { BUTTONS_GROUP_SEPARATOR } from 'shared/ui';
import { strengthTrainingGroup, otherFieldName } from '../config';
import { UserProfile } from 'features/User/model';

export function getCategories(favorite_training_types: string): string[] {
  if (!favorite_training_types) {
    return [];
  }

  const inputItems = [
    ...favorite_training_types.split(BUTTONS_GROUP_SEPARATOR).map((item) => item.trim()),
  ];

  return Object.keys(strengthTrainingGroup).filter((category) =>
    strengthTrainingGroup[category].some((activity) => inputItems.includes(activity)),
  );
}
