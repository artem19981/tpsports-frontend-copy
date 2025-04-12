'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';

export const getTagsBy = async (bot_name: any) => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance.get(`/tags/by-bot/${bot_name}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  );
  return data;
};
