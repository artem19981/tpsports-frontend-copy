import React, { FC, ReactNode } from 'react';

import { MuiProvider } from './MuiProvider';
import { ReactQueryProvider } from './ReactQueryProvider';
import { SnackbarProvider } from 'shared/ui';

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <MuiProvider>
        <SnackbarProvider>{children}</SnackbarProvider>
      </MuiProvider>
    </ReactQueryProvider>
  );
};
