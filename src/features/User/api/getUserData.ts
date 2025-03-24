'use server';

import { cache } from 'react';

import { axiosInstance, withTokenInterceptor } from 'shared/api';

import { UserDto } from '../model';
import { cookies } from 'next/headers';

export const getUserData = cache(async () => {
  const accessToken = cookies().get('access_token');

  if (!accessToken) {
    return null;
  }

  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance<UserDto>('/users/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  return data;
});
