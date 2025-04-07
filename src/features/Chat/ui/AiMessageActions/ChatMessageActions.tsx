'use client';

import React, { memo, useState } from 'react';

import CopyIcon from '@/app/assets/images/aiChat/messages/copy.svg?component';
import DislikeIcon from '@/app/assets/images/aiChat/messages/dislike.svg?component';
import LikeIcon from '@/app/assets/images/aiChat/messages/like.svg?component';
import { IconButton } from '@mui/material';
import { rateMessage } from 'features/Chat/api';
import { useQueryClient } from '@tanstack/react-query';
import { ChatDto } from 'features/Chat/model';
import removeMarkdown from 'remove-markdown';

import styles from './ChatMessageActions.module.scss';
import { QueryKeys } from 'shared/constants/query-keys';

interface Props {
  chatId: number;
  message_id: string;
  text: string;
  rate: string;
}

export const ChatMessageActions = memo(({ chatId, message_id, text, rate }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  const queryClient = useQueryClient();

  const copyMessage = async () => {
    setIsCopied(true);

    navigator.clipboard.writeText(removeMarkdown(text));
  };

  const likeMessage = () => {
    rateMessage({
      message_id,
      rate: rate === 'like' ? 'not rated' : 'like',
    }).then(() => {
      queryClient.setQueryData([QueryKeys.Chat, chatId], (prevChat: ChatDto) => {
        const newMessages = prevChat.messages.map((message) => {
          return message_id === message.id
            ? {
                ...message,
                rate: rate === 'like' ? 'not rated' : 'like',
              }
            : message;
        });
        return {
          ...prevChat,
          messages: newMessages,
        };
      });
    });
  };

  const dislikeMessage = () => {
    rateMessage({
      message_id,
      rate: rate === 'dislike' ? 'not rated' : 'dislike',
    }).then(() => {
      queryClient.setQueryData([QueryKeys.Chat, chatId], (prevChat: ChatDto) => {
        const newMessages = prevChat.messages.map((message) => {
          return message_id === message.id
            ? {
                ...message,
                rate: rate === 'dislike' ? 'not rated' : 'dislike',
              }
            : message;
        });
        return {
          ...prevChat,
          messages: newMessages,
        };
      });
    });
  };

  return (
    <div className={styles.container}>
      <IconButton onClick={likeMessage}>
        <LikeIcon color={rate === 'like' ? '#F54B00' : '#fff'} />
      </IconButton>

      <IconButton onClick={dislikeMessage}>
        <DislikeIcon color={rate === 'dislike' ? '#F54B00' : '#fff'} />
      </IconButton>

      <IconButton onClick={copyMessage}>
        <CopyIcon color={isCopied ? '#F54B00' : '#fff'} />
      </IconButton>
    </div>
  );
});

ChatMessageActions.displayName = 'ChatMessageActions';
