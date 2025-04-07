'use client';

import type { FC, PropsWithChildren } from 'react';
import React, { createContext, useCallback, useState } from 'react';

import { ChatType } from 'entities/chat/model/ChatType';
import { usePathname } from 'next/navigation';

interface ChatTypeContextProps {
  chatType: ChatType | undefined;
  setChatType: (type: ChatType | undefined) => void;
}

const ChatTypeContext = createContext<ChatTypeContextProps | undefined>(undefined);
const ASSISTANCE = [
  ChatType.Trainer,
  ChatType.Doctor,
  ChatType.Nutritionolog,
  ChatType.Psychologist,
];
const LOCAL_STORAGE_KEY = 'chatType';

export const ChatTypeProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const pathname = usePathname();

  const [chatType, setChatType] = useState<ChatType | undefined>(() => {
    // @todo: НЕ УДАЛЯТЬ!
    const valueFromLS = localStorage?.getItem?.(LOCAL_STORAGE_KEY);

    if (valueFromLS) {
      return valueFromLS as ChatType;
    }

    const lastPartOfPath = pathname.split('/').at(-1);

    if (lastPartOfPath && ASSISTANCE.includes(lastPartOfPath as ChatType)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, lastPartOfPath);
      return lastPartOfPath as ChatType;
    }
  });

  const onChange = useCallback((type: ChatType | undefined) => {
    if (type) {
      localStorage.setItem(LOCAL_STORAGE_KEY, type || '');
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
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
