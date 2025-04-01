'use server';

import { axiosInstance } from 'shared/api';

import { LoginDto, LoginPayload } from '../model';
import { UserDto } from 'features/User/model';
import { AxiosError } from 'axios';
import { getUserProfile } from 'features/User/api';
import { setAccessToken } from '../lib';

export const login = async (
  payload: LoginPayload
): Promise<UserDto | string> => {
  try {
    const { data } = await axiosInstance.post<LoginDto>('/login', payload);

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
