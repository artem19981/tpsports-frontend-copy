'use server';

import { cookies } from 'next/headers';
import { axiosInstance, withTokenInterceptor } from 'shared/api';

export const logoutUserFromAllDevices = async () => {
  await withTokenInterceptor(async (accessToken: string) => {
    await axiosInstance.post(
      '/logout-all',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    cookies().delete('access_token');

    return {};
  });
};
