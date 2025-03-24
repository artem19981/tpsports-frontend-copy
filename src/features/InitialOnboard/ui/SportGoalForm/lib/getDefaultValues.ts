import { UserProfile } from 'features/User/model';

export const getDefaultValues = (userProfile: UserProfile) => {
  const { fitness_goal, fitness_goal_other } = userProfile;

  return {
    fitness_goal: fitness_goal || '',
    fitness_goal_other: fitness_goal_other || '',
  };
};
