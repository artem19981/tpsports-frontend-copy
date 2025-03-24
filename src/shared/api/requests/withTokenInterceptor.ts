'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const withTokenInterceptor = async <T extends object>(
  fn: (accessToken: string) => Promise<T>,
  checkAuthErrors: boolean = true
) => {
  try {
    const accessToken = cookies().get('access_token');

    if (!accessToken) {
      redirect('/logout');
    }

    return await fn(accessToken.value);
  } catch (e: any) {
    console.log(e.status, 'withTokenInterceptor error');

    if ((e.status === 401 || e.status === 403) && checkAuthErrors) {
      redirect('/logout');
    }

    throw e;
  }
};
