'use server';

import { axiosInstance } from 'shared/api';

export const resetPassword = async (email: string) => {
  await axiosInstance.post('/password/reset', { email });
  return true;
};
