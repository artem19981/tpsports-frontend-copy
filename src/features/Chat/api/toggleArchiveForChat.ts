'use server';

import { AxiosError } from 'axios';
import { axiosInstance, withTokenInterceptor } from 'shared/api';

export const toggleArchiveForChat = async (id: number) => {
  try {
    const { data } = await withTokenInterceptor((token: string) =>
      axiosInstance.post(
        `/dialogues/${id}/archive/toggle`,
        {
          dialogue_id: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      ),
    );

    return data;
  } catch (e) {
    const error = e as AxiosError;
    console.log(error, 'error');

    return JSON.stringify(error);
  }
};
