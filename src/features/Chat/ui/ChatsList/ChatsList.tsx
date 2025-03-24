'use client';

import React, { memo } from 'react';

import { ChatType } from 'entities/chat/model/ChatType';
import { useChatType } from 'entities/chat/ui';
import { BOTS } from 'shared/constants/bots';

import styles from './ChatsList.module.scss';
import { useGetActiveChats } from 'features/Chat/lib/useGetActiveChats';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'shared/ui';

interface Props {
  isUserAuthorized: boolean;
  onChange?: (type: ChatType) => void;
}

export const ChatsList = memo(({ isUserAuthorized, onChange }: Props) => {
  const router = useRouter();
  const chatTypeContext = useChatType();
  const showSnackbar = useSnackbar();

  const {
    data: activeChats,
    isLoading,
    error,
  } = useGetActiveChats(isUserAuthorized);

  const { chatType, setChatType } = chatTypeContext || {};

  const onClick = (type: ChatType) => {
    if (isLoading) {
      showSnackbar('Подождите, идет загрузка чатов', 'info');
      return;
    }

    if (!activeChats || error) {
      if (isUserAuthorized) {
        showSnackbar('Не удалось загрузить активные чаты', 'error');
      }

      onChange?.(type);
      setChatType?.(type);
      return;
    }

    if (onChange) {
      onChange(type);
      return;
    }

    // if (activeChats[type]) {
    router.push('/ai/chat/' + type);
    // } else {
    //   setChatType?.(type);
    // }
  };

  return (
    <div className={styles.container}>
      {BOTS.map(({ name, translation, gradient, shadowColor, color }) => (
        <div
          key={name}
          className={styles.tab}
          onClick={() => onClick(name as ChatType)}
          style={{
            background: chatType === name ? gradient : 'transparent',
            boxShadow: chatType === name ? shadowColor : '',
            color: chatType === name ? color : undefined,
          }}
        >
          <span>{translation}</span>
        </div>
      ))}
    </div>
  );
});

ChatsList.displayName = 'ChatsList';
