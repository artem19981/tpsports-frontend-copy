import React, { FC, ReactNode } from 'react';

import { MuiProvider } from './MuiProvider';
import { ReactQueryProvider } from './ReactQueryProvider';
import { SnackbarProvider } from 'shared/ui';
import { ChatTypeProvider } from 'entities/chat/ui';
import { ChatType } from 'entities/chat/model/ChatType';

interface Props {
  initialChatType: ChatType | null;
  children: ReactNode;
}

export const Providers: FC<Props> = ({ initialChatType, children }) => {
  return (
    <ReactQueryProvider>
      <MuiProvider>
        <ChatTypeProvider initialChatType={initialChatType}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ChatTypeProvider>
      </MuiProvider>
    </ReactQueryProvider>
  );
};
