'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';

import { AxiosError } from 'axios';

export const linkTelegramAccount = async (payload: any) => {
  try {
    const { data } = await withTokenInterceptor((token: string) =>
      axiosInstance.post('/telegram/link', payload, {
        headers: { Authorization: `Bearer ${token}` },
      }),
    );

    return data;
  } catch (e) {
    const error = e as AxiosError;

    return JSON.stringify(error);
  }
};
