'use server';

import { cookies } from 'next/headers';

export const deleteAccessToken = async () => {
  cookies().delete('access_token');
};
