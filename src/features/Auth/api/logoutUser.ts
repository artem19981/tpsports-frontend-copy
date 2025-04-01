'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { deleteAccessToken } from '../lib';

export const logoutUser = async () => {
  await withTokenInterceptor(async (token: string) => {
    await axiosInstance.post(
      '/logout',
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    deleteAccessToken();

    return {};
  });
};
