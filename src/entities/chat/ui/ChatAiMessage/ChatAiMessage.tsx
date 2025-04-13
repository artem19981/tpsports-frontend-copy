'use client';

import React, { memo } from 'react';

import { AiBot } from 'shared/model/aiBot';
import { ChatMessageDto } from 'features/Chat/model';
import { Stack } from '@mui/material';
import { AnimatedLogo } from 'shared/ui';
import ReactMarkdown from 'react-markdown';

import styles from './ChatAiMessage.module.scss';
import { AiMessageLoader } from './AiMessageLoader/AiMessageLoader';
import { usePrintMessageV2 } from './lib/usePrintMessageV2';
import { NEW_GPT_MESSAGE_ID } from 'entities/chat/config';

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

  redirectButton?: React.ReactNode;
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
    redirectButton,
    renderActions,
    onEndPrint,
  }: Props) => {
    const displayedText = usePrintMessageV2({
      withAnimation,
      messageText,
      isGPTMessageStreaming,
      onEndPrint,
    });

    return (
      <Stack gap={0} style={{ minHeight: height }}>
        <Stack gap={1} direction="row">
          {isGPTMessageStreaming ? (
            <AiMessageLoader selectedBot={selectedBot} />
          ) : (
            <AnimatedLogo animation={selectedBot.animation} className={styles.logo} />
          )}

          {!isMessageLoading && (
            <div className={styles.messagesText}>
              <ReactMarkdown>{displayedText}</ReactMarkdown>
            </div>
          )}
        </Stack>

        {!isGPTMessageStreaming &&
          !messageId.startsWith(NEW_GPT_MESSAGE_ID) &&
          renderActions({
            text: messageText,
            rate,
            message_id: messageId,
          })}

        {redirectButton}
      </Stack>
    );
  },
);

ChatAiMessage.displayName = 'ChatAiMessage';
