import { UserProfile } from 'features/User/model';
import { fitnessLevelOptions } from '../config';

export const getDefaultValues = (userProfile: UserProfile) => {
  const steps = userProfile.steps ? userProfile.steps.split(' ')[0] : 0;
  const fitness_level = fitnessLevelOptions.findIndex(
    (item) => item === userProfile.fitness_level
  );

  return {
    fitness_level: fitness_level !== -1 ? fitness_level.toString() : '1',
    steps: +steps,
  };
};
