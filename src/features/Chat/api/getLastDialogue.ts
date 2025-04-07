'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { LastActiveChatDto } from '../model';
import { cache } from 'react';

export const getLastDialogue = cache(async () => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance<LastActiveChatDto>('/last_dialogue', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );

  return data;
});
