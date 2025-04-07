'use client';

import type { FC, PropsWithChildren } from 'react';
import React, { createContext, useCallback, useState } from 'react';
import Cookies from 'js-cookie';
import { ChatType } from 'entities/chat/model/ChatType';
import { CHAT_TYPE_COOKIE_KEY } from 'entities/chat/config';

interface ChatTypeContextProps {
  chatType: ChatType | undefined;
  setChatType: (type: ChatType | undefined) => void;
}

const ChatTypeContext = createContext<ChatTypeContextProps | undefined>(undefined);

interface Props {
  initialChatType: ChatType | null;
}

export const ChatTypeProvider: FC<PropsWithChildren<Props>> = ({ initialChatType, children }) => {
  const [chatType, setChatType] = useState<ChatType | undefined>(() => {
    if (initialChatType) {
      return initialChatType as ChatType;
    }
  });

  const onChange = useCallback((type: ChatType | undefined) => {
    if (type) {
      Cookies.set(CHAT_TYPE_COOKIE_KEY, type || '', {
        expires: 30,
      });
    } else {
      Cookies.remove(CHAT_TYPE_COOKIE_KEY);
    }

    setChatType(type);
  }, []);

  return (
    <ChatTypeContext.Provider value={{ chatType, setChatType: onChange }}>
      {children}
    </ChatTypeContext.Provider>
  );
};

export const useChatType = () => {
  const context = React.useContext(ChatTypeContext);

  return context;
};
