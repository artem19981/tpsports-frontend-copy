import { UserProfile } from 'features/User/model';
import { alcoholOptions } from '../config';
import { isDefined } from 'shared/lib/is-defined';

export const getDefaultValues = (data: UserProfile) => {
  // const sleep_quality = data.sleep_quality ? data.sleep_quality.split(' ')
  const alcohol_consumption = alcoholOptions.findIndex(
    (item) => item === data.alcohol_consumption
  );

  return {
    sleep_schedule_wakeUp: data.sleep_schedule?.wake_time || '09:30',
    sleep_schedule_down: data.sleep_schedule?.bedtime || '22:00',
    sleep_quality: isDefined(data.sleep_quality) ? data.sleep_quality : 7,
    smoking: data.smoking || false,
    alcohol_consumption: alcohol_consumption !== -1 ? +alcohol_consumption : 2,
  };
};
