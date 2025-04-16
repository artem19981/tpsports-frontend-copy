'use server';

import { AxiosError } from 'axios';
import { axiosInstance, withTokenInterceptor } from 'shared/api';

export const linkEmailAddress = async (email: string) => {
  try {
    const { data } = await withTokenInterceptor((token: string) =>
      axiosInstance.post(
        '/users/email/update',
        { email },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );

    return data;
  } catch (e) {
    const error = e as AxiosError;

    return JSON.stringify(error);
  }
};
