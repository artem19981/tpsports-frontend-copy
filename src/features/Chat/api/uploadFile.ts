'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';
import { UploadFileDto } from '../model';

export const uploadFile = async (payload: FormData) => {
  const { data } = await withTokenInterceptor(
    async (token: string) =>
      await axiosInstance.post<UploadFileDto>(`/upload_file`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/octet-stream',
        },
      })
  );

  return data.file_id;
};
