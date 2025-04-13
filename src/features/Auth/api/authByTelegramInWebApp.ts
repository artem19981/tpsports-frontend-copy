'use server';

import { axiosInstance } from 'shared/api';

import { LoginDto } from '../model';
import { AxiosError } from 'axios';
import { getUserProfile } from 'features/User/api';
import { setAccessToken } from '../lib';

export const authByTelegramInWebApp = async (payload: any) => {
  try {
    const { data } = await axiosInstance.post<LoginDto>(`/telegram/auth-by-mini-app`, payload);

    setAccessToken(data.access_token);

    const profile = await getUserProfile();

    return {
      ...data.user,
      access_token: data.access_token,
      isOnboardingCompleted: profile.is_completed,
    };
  } catch (e) {
    const error = e as AxiosError;
    console.log(error, 'error');

    return JSON.stringify(error);
  }
};
