import React, { FC, ReactNode } from 'react';

import { MuiProvider } from './MuiProvider';
import { ReactQueryProvider } from './ReactQueryProvider';
import { SnackbarProvider } from 'shared/ui';
import { ChatTypeProvider } from 'entities/chat/ui';

interface Props {
  children: ReactNode;
}

export const Providers: FC<Props> = ({ children }) => {
  return (
    <ReactQueryProvider>
      <MuiProvider>
        <ChatTypeProvider>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ChatTypeProvider>
      </MuiProvider>
    </ReactQueryProvider>
  );
};
