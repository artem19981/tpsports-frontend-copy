'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { ActiveChatsDto } from '../model';
import { cache } from 'react';

export const getActiveChats = cache(async () => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance<ActiveChatsDto>('/active_chats', {
      headers: { Authorization: `Bearer ${token}` },
    })
  );

  return data;
});
