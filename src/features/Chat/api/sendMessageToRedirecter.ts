'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { SendMessageDto } from '../model';

export const sendMessageToRedirecter = async (
  payload: Omit<SendMessageDto, 'bot_name' | 'dialogue_id'>,
) => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance.post('/redirect', payload, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );

  return data;
};
