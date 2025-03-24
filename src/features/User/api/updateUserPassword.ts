'use server';

import { cache } from 'react';

import { axiosInstance, withTokenInterceptor } from 'shared/api';

import { UpdateUserPasswordPayload } from '../model/UpdateUserPasswordPayload';
import { AxiosError } from 'axios';

export const updateUserPassword = cache(
  async (payload: UpdateUserPasswordPayload) => {
    try {
      const { new_password, old_password } = payload;

      const { data } = await withTokenInterceptor(
        (token: string) =>
          axiosInstance.post(
            '/users/password',
            { new_password, old_password },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          ),
        false
      );

      return data;
    } catch (e) {
      const error = e as AxiosError;

      return JSON.stringify(error);
    }
  }
);
