import { UserProfile } from 'features/User/model';
import { isDefined } from 'shared/lib/is-defined';
import isEqual from 'lodash/isEqual';

export const getIsDirty = (
  changedFields: Record<string, boolean>,
  userProfile: UserProfile,
  form: any
) => {
  const isAnyFieldsWillBeNull = Object.keys(changedFields).some((key) => {
    if (
      (!isDefined(userProfile[key as keyof UserProfile]) &&
        changedFields[key]) ||
      userProfile[key as keyof UserProfile] !== form[key]
    ) {
      return true;
    }
  });

  if (isAnyFieldsWillBeNull) {
    return true;
  }

  if (
    !userProfile.sleep_schedule &&
    (changedFields.sleep_schedule_down || changedFields.sleep_schedule_wakeUp)
  ) {
    return true;
  }

  if (
    userProfile.sleep_schedule &&
    !isEqual(userProfile.sleep_schedule, {
      bedtime: form.sleep_schedule_down,
      wake_time: form.sleep_schedule_wakeUp,
    })
  ) {
    return true;
  }

  // if (userProfile.smoking !== form.smoking) {
  //   return true;
  // }

  // if (
  //   (changedFields.fitness_level && !userProfile.fitness_level) ||
  //   userProfile.fitness_level !==
  //     fitnessLevelOptions[
  //       +form.fitness_level as keyof typeof fitnessLevelOptions
  //     ]
  // ) {
  //   return true;
  // }

  return false;
};
