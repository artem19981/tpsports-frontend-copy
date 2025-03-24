import { UserProfile } from 'features/User/model';
import { isDefined } from 'shared/lib/is-defined';

export const getDefaultValues = (data: UserProfile) => {
  return {
    daily_water_intake: isDefined(data.daily_water_intake)
      ? data.daily_water_intake
      : 2,
    food_intolerance: data.food_intolerance || '',
    food_allergies: data.food_allergies || '',
    memory: isDefined(data.memory) ? data.memory : 7,
    learning: isDefined(data.learning) ? data.learning : 7,
  };
};
