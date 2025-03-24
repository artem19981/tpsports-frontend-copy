import { FoodSchema } from 'features/InitialOnboard/schemas';
import { UserProfile } from 'features/User/model';

export const getIsDirty = (
  changedFields: Record<string, boolean>,
  userProfile: UserProfile,
  form: any
) => {
  return Object.keys(changedFields).some((key) => {
    const _key = key as keyof UserProfile;

    if (userProfile[key as keyof UserProfile] === null) {
      return true;
    }

    if (form[key as keyof FoodSchema] !== userProfile[_key]) {
      return true;
    }
  });
};
