'use client';

import { Stack } from '@mui/material';
import {
  AnimatedChatLogo,
  ChatAiMessage,
  ChatAiMessageActionsProps,
  ChatUserMessage,
  useChatType,
} from 'entities/chat/ui';
import { ChatMessageActions, RedirectToAnotherChatButton } from 'features/Chat/ui';
import { useCallback } from 'react';

import classNames from 'classnames';
import { NEW_USER_MESSAGE_ID } from 'entities/chat/config';
import { useGetSelectedBot } from 'entities/chat/lib/useGetSelectedBot';
import { ChatTabs } from 'features/Chat/ui';
import { ChatPageInput } from 'features/Chat/ui/ChatPageInput/ChatPageInput';
import { useChatMessage } from 'features/Chat/ui/ChatPageInput/lib/useChatMessage';
import { AiBot } from 'shared/model/aiBot';
import { DEFAULT_AI_MESSAGE_HEIGHT } from '../config/defaultMessageheight';
import { useAiMessageWithLoading, useChat, useSetPageTitle, useShowScrollButton } from '../lib';
import { useSendMessageWhenMount } from '../lib/useSendMessageWhenMount';
import { MessageSkeletons } from './MessageSkeletons/MessageSkeletons';
import { ScrollButton } from './ScrollButton/ScrollButton';
import { useGetActiveChatId } from 'features/Chat/lib/useActiveChatId';

import styles from './Chat.module.scss';
import { ChatVariant } from 'features/Chat/model';
import { BOTS } from 'shared/constants/bots';
import { ChatType } from 'entities/chat/model/ChatType';

export const Chat = () => {
  const chatId = useGetActiveChatId();
  const chatVariant = (useChatType()?.chatType || ChatType.Trainer) as ChatVariant;
  const selectedBot = (useGetSelectedBot(chatVariant) || BOTS[0]) as AiBot;

  useSetPageTitle(chatVariant);

  const {
    showSkeletons,
    messages,
    messagesRef,
    isGPTMessageLoading,
    isGPTMessageStreaming,
    isFetching,
    hasData,
    updateChatMessages,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming,
    scrollToLastMessage,
  } = useChat(chatId);

  const { lastUserMessageRef, lastGPTMessageHeight, animateText, onSendMessage, setAnimateText } =
    useAiMessageWithLoading(messagesRef, chatId, scrollToLastMessage);

  const { isMessageLoading } = useSendMessageWhenMount({
    chatVariant,
    isFetching,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming,
    onSend: onSendMessage,
  });

  const showScrollButton = useShowScrollButton(messagesRef);

  const Actions = useCallback(
    (props: ChatAiMessageActionsProps) => <ChatMessageActions {...props} chatId={chatId!} />,
    [chatId],
  );

  const onEndPrint = useCallback(() => {
    setAnimateText(false);
    updateChatMessages();
  }, [updateChatMessages, setAnimateText]);

  const { sendMessage } = useChatMessage(
    chatVariant,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming,
  );

  const handleLocalTagClick = (tag: { description: string }) => {
    sendMessage({ content: tag.description });
  };

  return (
    <Stack className={styles.container}>
      {messages.length === 0 && !isFetching && hasData ? (
        <div className={styles.animateLogo}>
          <AnimatedChatLogo />
        </div>
      ) : null}
      <Stack
        className={classNames(styles.messages, 'hide-scroll', {
          [styles.withLoading]: isFetching,
        })}
        ref={messagesRef}
      >
        {isFetching && showSkeletons && !hasData && <MessageSkeletons />}

        {messages.map((message, idx) => {
          if (message.sender === 'user') {
            const isLastMessage = message.id.startsWith(NEW_USER_MESSAGE_ID);

            return (
              <ChatUserMessage
                innerRef={isLastMessage ? lastUserMessageRef : undefined}
                key={message.id}
                message={message}
              />
            );
          } else {
            const isLastMessage = idx === messages.length - 1;
            const isMessageWithAnimation = animateText && isLastMessage;

            const lastMessageRedirectAssistant = messages.at(-1)?.redirect?.bot;
            const showRedirectButton = !!lastMessageRedirectAssistant && isLastMessage;

            return (
              <ChatAiMessage
                key={message.id}
                selectedBot={selectedBot}
                messageId={message.id}
                rate={message.rate}
                messageText={message.content[0].text.value}
                onEndPrint={onEndPrint}
                renderActions={Actions}
                redirectButton={
                  showRedirectButton && (
                    <RedirectToAnotherChatButton
                      message={messages.at(-2)!}
                      newChat={lastMessageRedirectAssistant}
                    />
                  )
                }
                isMessageLoading={isGPTMessageLoading && isLastMessage}
                height={
                  isLastMessage && lastGPTMessageHeight !== DEFAULT_AI_MESSAGE_HEIGHT
                    ? lastGPTMessageHeight
                    : undefined
                }
                withAnimation={false}
                isGPTMessageStreaming={false}
                {...(isMessageWithAnimation && {
                  withAnimation: true,
                  renderActions: () => null,
                  isGPTMessageStreaming,
                })}
              />
            );
          }
        })}

        {showScrollButton && <ScrollButton onClick={scrollToLastMessage} />}
      </Stack>

      <div className={styles.chatInput}>
        {messages.length === 0 && !isFetching && hasData ? (
          <div className={styles.chatTabs}>
            <ChatTabs onLocalTagClick={handleLocalTagClick} />
          </div>
        ) : null}

        <ChatPageInput
          isMessageLoading={isMessageLoading || isGPTMessageStreaming || isGPTMessageLoading}
          chatVariant={chatVariant}
          onSend={onSendMessage}
          setIsGPTMessageLoading={setIsGPTMessageLoading}
          setIsGPTMessageStreaming={setIsGPTMessageStreaming}
        />
      </div>
    </Stack>
  );
};
