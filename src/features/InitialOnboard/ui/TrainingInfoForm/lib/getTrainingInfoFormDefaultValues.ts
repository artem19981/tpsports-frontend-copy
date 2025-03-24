import { UserProfile } from 'features/User/model';

export const getTrainingInfoFormDefaultValues = (userProfile: UserProfile) => ({
  training_location: userProfile.training_location || '',
  injuries_or_restrictions: userProfile.injuries_or_restrictions || '',
  equipment: userProfile.equipment || '',
});
