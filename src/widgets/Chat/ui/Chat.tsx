"use client";

import { Stack } from "@mui/material";
import {
  AnimatedChatLogo,
  ChatAiMessage,
  ChatAiMessageActionsProps,
  ChatUserMessage,
} from "entities/chat/ui";
import { ChatVariant } from "features/Chat/model";
import { ChatMessageActions } from "features/Chat/ui";
import { useCallback } from "react";

import { AiBot } from "shared/model/aiBot";

import classNames from "classnames";
import { NEW_USER_MESSAGE_ID } from "entities/chat/config";
import { useGetSelectedBot } from "entities/chat/lib/useGetSelectedBot";
import { ChatPageInput } from "features/Chat/ui/ChatPageInput/ChatPageInput";
import { useAiMessageWithLoading, useChat, useShowScrollButton } from "../lib";
import { MessageSkeletons } from "./MessageSkeletons/MessageSkeletons";

import { DEFAULT_AI_MESSAGE_HEIGHT } from "../config/defaultMessageheight";
import { useSendMessageWhenMount } from "../lib/useSendMessageWhenMount";
import styles from "./Chat.module.scss";
import { ScrollButton } from "./ScrollButton/ScrollButton";

interface Props {
  chatVariant: ChatVariant;
}

export const Chat = ({ chatVariant }: Props) => {
  const {
    messages,
    messagesRef,
    isGPTMessageLoading,
    isGPTMessageStreaming,
    isFetching,
    hasData,
    refetch,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming,
    scrollToLastMessage,
  } = useChat(chatVariant);

  const {
    lastUserMessageRef,
    lastGPTMessageHeight,
    animateText,
    onSendMessage,
    setAnimateText,
  } = useAiMessageWithLoading(messagesRef, chatVariant, scrollToLastMessage);

  const { isMessageLoading } = useSendMessageWhenMount({
    chatVariant,
    isFetching,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming,
    onSend: onSendMessage,
  });

  const showScrollButton = useShowScrollButton(messagesRef);

  const selectedBot = useGetSelectedBot(chatVariant) as AiBot;

  const Actions = useCallback(
    (props: ChatAiMessageActionsProps) => (
      <ChatMessageActions {...props} chatVariant={chatVariant} />
    ),
    [chatVariant]
  );

  const onEndPrint = useCallback(() => {
    setAnimateText(false);
    refetch();
  }, []);

  console.log(messages);

  return (
    <Stack className={styles.container}>
      {messages.length === 0 ? (
        <div className={styles.animateLogo}>
          <AnimatedChatLogo />
        </div>
      ) : (
        <></>
      )}
      <Stack
        className={classNames(styles.messages, "hide-scroll", {
          [styles.withLoading]: isFetching,
        })}
        ref={messagesRef}
      >
        {isFetching && !hasData && <MessageSkeletons />}

        {messages.map((message, idx) => {
          if (message.sender === "user") {
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

            return (
              <ChatAiMessage
                key={message.id}
                selectedBot={selectedBot}
                messageId={message.id}
                rate={message.rate}
                messageText={message.content[0].text.value}
                onEndPrint={onEndPrint}
                renderActions={Actions}
                isMessageLoading={isGPTMessageLoading && isLastMessage}
                height={
                  isLastMessage &&
                  lastGPTMessageHeight !== DEFAULT_AI_MESSAGE_HEIGHT
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
        <ChatPageInput
          isMessageLoading={
            isMessageLoading || isGPTMessageStreaming || isGPTMessageLoading
          }
          chatVariant={chatVariant}
          onSend={onSendMessage}
          setIsGPTMessageLoading={setIsGPTMessageLoading}
          setIsGPTMessageStreaming={setIsGPTMessageStreaming}
        />
      </div>
    </Stack>
  );
};
