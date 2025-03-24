'use client';

import type { FC, PropsWithChildren } from 'react';
import React, { createContext, useState } from 'react';

import { ChatType } from 'entities/chat/model/ChatType';

interface ChatTypeContextProps {
  chatType: ChatType | undefined;
  setChatType: (type: ChatType | undefined) => void;
}

const ChatTypeContext = createContext<ChatTypeContextProps | undefined>(
  undefined
);

interface Props {
  defaultValue?: ChatType;
}

export const ChatTypeProvider: FC<PropsWithChildren<Props>> = ({
  children,
  defaultValue,
}) => {
  const [chatType, setChatType] = useState<ChatType | undefined>(defaultValue);

  return (
    <ChatTypeContext.Provider value={{ chatType, setChatType }}>
      {children}
    </ChatTypeContext.Provider>
  );
};

export const useChatType = () => {
  const context = React.useContext(ChatTypeContext);

  return context;
};
