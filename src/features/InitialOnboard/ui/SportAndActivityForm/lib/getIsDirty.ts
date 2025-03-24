import { UserProfile } from 'features/User/model';
import { getStepsString } from './getStepsString';
import { fitnessLevelOptions } from '../config';
import { isDefined } from 'shared/lib/is-defined';

export const getIsDirty = (
  changedFields: Record<string, boolean>,
  userProfile: UserProfile,
  form: any
) => {
  const isAnyFieldsWillBeNull = Object.keys(changedFields).some((key) => {
    if (
      !isDefined(userProfile[key as keyof UserProfile]) &&
      changedFields[key]
    ) {
      return true;
    }
  });

  if (isAnyFieldsWillBeNull) {
    return true;
  }

  if (
    (userProfile.steps === undefined && changedFields.steps) ||
    userProfile.steps !== getStepsString(form.steps)
  ) {
    return true;
  }

  if (
    (changedFields.fitness_level && !userProfile.fitness_level) ||
    userProfile.fitness_level !==
      fitnessLevelOptions[
        +form.fitness_level as keyof typeof fitnessLevelOptions
      ]
  ) {
    return true;
  }

  return false;
};
