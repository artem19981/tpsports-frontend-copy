'use server';

import { getUserProfile } from 'features/User/api';
import { setAccessToken } from '../lib';
import { InitialOnboardStep } from 'features/InitialOnboard/model';

export const loginAfterConfirmRegistration = async (token: string) => {
  await setAccessToken(token);

  const profile = await getUserProfile();

  if (profile.is_completed) {
    return '/ai';
  }

  return '/initial-onboard?step=' + InitialOnboardStep.Initial;
};
