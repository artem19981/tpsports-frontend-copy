'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';

import { UpdateUserPayload } from '../model/UpdateUserPayload';
import { revalidatePath } from 'next/cache';

export const updateUserSettings = async (payload: UpdateUserPayload) => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance.put('/profile', payload, {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  revalidatePath('/initial-onboard');

  return data;
};
