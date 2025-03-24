import React from 'react';

import { ChangePasswordPage } from 'pageModules/ChangePasswordPage';

export default function ChangePassword({ searchParams }: any) {
  return <ChangePasswordPage token={searchParams?.token} />;
}
