'use client';

import React, { useCallback } from 'react';
import { Chat } from 'widgets/Chat';
import { ChatVariant } from 'features/Chat/model';
import { ChatTypeProvider } from 'entities/chat/ui';
import { ChatType } from 'entities/chat/model/ChatType';
import { ChatsList } from 'features/Chat/ui';
import { MainLayout } from 'app/Layouts';
import styles from './ChatPage.module.scss';
import { useRouter } from 'next/navigation';

interface Props {
  chatVariant: ChatVariant;
}

export const ChatPage = ({ chatVariant }: Props) => {
  const router = useRouter();

  const onChangeChat = useCallback((type: string) => {
    router.push(`/ai/chat/${type}`);
  }, []);

  return (
    <ChatTypeProvider defaultValue={chatVariant as ChatType}>
      <MainLayout
        containerClassName={styles.layoutContainer}
        contentClassName={styles.content}
        links={<ChatsList onChange={onChangeChat} isUserAuthorized />}
      >
        <Chat chatVariant={chatVariant} />
      </MainLayout>
    </ChatTypeProvider>
  );
};
