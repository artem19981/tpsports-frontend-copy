'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { deleteAccessToken } from '../lib';

export const logoutUserFromAllDevices = async () => {
  await withTokenInterceptor(async (accessToken: string) => {
    await axiosInstance.post(
      '/logout-all',
      {},
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    deleteAccessToken();

    return {};
  });
};
