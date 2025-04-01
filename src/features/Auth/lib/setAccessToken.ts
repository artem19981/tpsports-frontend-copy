'use server';

import { cookies } from 'next/headers';

export const setAccessToken = async (token: string) => {
  const expirationDays = 365 * 100;
  const date = new Date();
  date.setTime(date.getTime() + expirationDays * 24 * 60 * 60 * 1000);

  cookies().set('access_token', token, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: date,
  });
};
