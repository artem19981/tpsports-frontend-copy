'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { ChatDto, ChatPayload } from '../model';

export const getChatMessages = async (payload: ChatPayload) => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance<ChatDto>('/user_messages', {
      params: payload,
      headers: { Authorization: `Bearer ${token}` },
    }),
  );

  return data;
};
