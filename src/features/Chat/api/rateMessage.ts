'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { RateMessageDto } from '../model';

export const rateMessage = async (payload: RateMessageDto) => {
  await withTokenInterceptor(
    async (token: string) =>
      await axiosInstance.post(`/message/rate`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
  );
};
