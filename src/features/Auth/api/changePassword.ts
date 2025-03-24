'use server';

import { axiosInstance } from 'shared/api';
import { ChangePasswordPayload } from '../model';
import { AxiosError } from 'axios';

export const changePassword = async ({
  password,
  token,
}: ChangePasswordPayload) => {
  try {
    await axiosInstance.post(
      '/users/password-by-link',
      { new_password: password },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return true;
  } catch (e) {
    const error = e as AxiosError;

    return JSON.stringify(error);
  }
};
