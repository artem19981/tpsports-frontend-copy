'use server';

import { cookies } from 'next/headers';
import { axiosInstance } from 'shared/api';

import { LoginDto, LoginPayload } from '../model';
import { UserDto } from 'features/User/model';
import { AxiosError } from 'axios';
import { getUserProfile } from 'features/User/api';

export const login = async (
  payload: LoginPayload
): Promise<UserDto | string> => {
  try {
    const { data } = await axiosInstance.post<LoginDto>('/login', payload);

    const expirationDays = 365 * 100;
    const date = new Date();
    date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);

    cookies().set('access_token', data.access_token, {
      secure: true,
      httpOnly: true,
      sameSite: 'lax',
      expires: date,
    });

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
