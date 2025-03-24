import { UserProfile } from 'features/User/model';

export const getStrengthTrainingFormDefaultValues = (
  userProfile: UserProfile
) => ({
  favorite_training_types: userProfile.favorite_training_types || '',
  favorite_training_types_other:
    userProfile.favorite_training_types_other || '',
});
