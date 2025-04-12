'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';

import { UserProfile } from '../model';
import { isDefined } from 'shared/lib/is-defined';

export const getUserProfile = async () => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance<UserProfile>('/profile', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );

  return formatUserProfile(data);
};

function formatUserProfile(data: UserProfile) {
  const _data: Partial<UserProfile> = {};

  Object.keys(data).forEach((key) => {
    const value = data[key as keyof UserProfile];

    if (isDefined(value)) {
      // @ts-ignore
      _data[key] = value;
    }
  });

  return _data as UserProfile;
}
