import { UserProfile } from 'features/User/model';
import { getTrainingInfoFormDefaultValues } from '../../TrainingInfoForm';
import { getStrengthTrainingFormDefaultValues } from '../../StrengthTrainingForm/lib/getStrengthTrainingFormDefaultValues';

export const getDefaultValues = (userProfile: UserProfile) => {
  return {
    ...getTrainingInfoFormDefaultValues(userProfile),
    ...getStrengthTrainingFormDefaultValues(userProfile),
  };
};
