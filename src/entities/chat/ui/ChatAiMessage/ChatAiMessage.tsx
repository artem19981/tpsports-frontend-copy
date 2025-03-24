'use client';

import React, { memo, ReactNode } from 'react';

import { AiBot } from 'shared/model/aiBot';
import { ChatMessageDto } from 'features/Chat/model';
import { Stack } from '@mui/material';
import { AnimatedLogo } from 'shared/ui';
import ReactMarkdown from 'react-markdown';

import styles from './ChatAiMessage.module.scss';
import { usePrintMessage } from './lib/usePrintMessage';
import { AiMessageLoader } from './AiMessageLoader/AiMessageLoader';

export interface ChatAiMessageActionsProps {
  message_id: string;
  text: string;
  rate: string;
}

interface Props {
  messageText: string;
  messageId: string;
  rate: ChatMessageDto['rate'];
  selectedBot: AiBot;
  isGPTMessageStreaming: boolean;
  withAnimation: boolean;

  isMessageLoading: boolean;
  height: string | undefined;

  renderActions: (actionsProps: ChatAiMessageActionsProps) => React.ReactNode;
  onEndPrint: () => void;
}

export const ChatAiMessage = memo(
  ({
    messageText,
    messageId,
    rate,
    selectedBot,
    isMessageLoading,
    isGPTMessageStreaming,
    withAnimation,
    height,
    renderActions,
    onEndPrint,
  }: Props) => {
    const displayedText = usePrintMessage({
      withAnimation,
      messageText,
      isGPTMessageStreaming,
      onEndPrint,
    });

    return (
      <Stack gap={1} style={{ minHeight: height }}>
        <Stack gap={1} direction="row">
          {isGPTMessageStreaming ? (
            <AiMessageLoader selectedBot={selectedBot} />
          ) : (
            <AnimatedLogo
              animation={selectedBot.animation}
              className={styles.logo}
            />
          )}

          {!isMessageLoading && (
            <div className={styles.messagesText}>
              <ReactMarkdown>{displayedText}</ReactMarkdown>
            </div>
          )}
        </Stack>

        {!isGPTMessageStreaming &&
          renderActions({
            text: messageText,
            rate,
            message_id: messageId,
          })}
      </Stack>
    );
  }
);

ChatAiMessage.displayName = 'ChatAiMessage';
