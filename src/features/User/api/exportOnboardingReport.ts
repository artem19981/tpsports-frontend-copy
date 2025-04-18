'use server';

import { axiosInstance, withTokenInterceptor } from 'shared/api';

export const exportOnboardingReport = async () => {
  const data = await withTokenInterceptor((token: string) =>
    axiosInstance<Blob>('/export-report-pdf', {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/pdf' },
      responseType: 'blob',
    }).then((res) => res.data),
  );

  return data;
};
