'use server';

import { setAccessToken } from '../lib';
import { redirect } from 'next/navigation';

export const loginAfterConfirmRegistration = async (token: string) => {
  try {
    setAccessToken(token);

    redirect('/ai');
  } catch (e) {
    return false;
  }
};
