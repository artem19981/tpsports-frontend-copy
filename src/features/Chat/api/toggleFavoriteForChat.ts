'use server';

import { AxiosError } from 'axios';
import { axiosInstance, withTokenInterceptor } from 'shared/api';

export const toggleFavoriteForChat = async (id: number) => {
  try {
    const { data } = await withTokenInterceptor((token: string) =>
      axiosInstance.post(
        `/dialogues/${id}/favorite/toggle`,
        {
          dialogue_id: id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            dialogue_id: id,
          },
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
