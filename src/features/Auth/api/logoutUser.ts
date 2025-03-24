'use server';

import { cookies } from 'next/headers';
import { axiosInstance, withTokenInterceptor } from 'shared/api';

export const logoutUser = async () => {
  await withTokenInterceptor(async (token: string) => {
    await axiosInstance.post(
      '/logout',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    cookies().delete('access_token');

    return {};
  });
};
