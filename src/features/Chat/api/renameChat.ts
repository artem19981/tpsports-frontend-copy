'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { RenameChatPayload } from '../model';
import { AxiosError } from 'axios';

export const renameChat = async ({ id, new_name }: RenameChatPayload) => {
  try {
    const { data } = await withTokenInterceptor((token: string) =>
      axiosInstance.post(
        `/dialogues/${id}/rename`,
        { new_name },
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
