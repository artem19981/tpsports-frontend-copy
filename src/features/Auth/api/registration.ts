'use server';

import { axiosInstance } from 'shared/api';

import { RegistrationPayload } from '../model';
import { AxiosError } from 'axios';

export const registration = async (payload: RegistrationPayload) => {
  try {
    const { data } = await axiosInstance.post<void>('/signup', payload);

    return data;
  } catch (e) {
    const error = e as AxiosError;

    return JSON.stringify(error);
  }
};
