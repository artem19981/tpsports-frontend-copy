'use server';

import { axiosInstance } from 'shared/api';

export const confirmRegistration = async (token: string) => {
  try {
    await axiosInstance.post('/confirm-token', { token });
    return true;
  } catch (e) {
    return false;
  }
};
