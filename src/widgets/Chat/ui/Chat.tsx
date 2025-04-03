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
import { useCallback, useEffect } from "react";

import classNames from "classnames";
import { NEW_USER_MESSAGE_ID } from "entities/chat/config";
import { useGetSelectedBot } from "entities/chat/lib/useGetSelectedBot";
import { ChatTabs } from "features/Chat/ui";
import { ChatPageInput } from "features/Chat/ui/ChatPageInput/ChatPageInput";
import { useChatMessage } from "features/Chat/ui/ChatPageInput/lib/useChatMessage";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiBot } from "shared/model/aiBot";
import { DEFAULT_AI_MESSAGE_HEIGHT } from "../config/defaultMessageheight";
import { useAiMessageWithLoading, useChat, useShowScrollButton } from "../lib";
import { useSendMessageWhenMount } from "../lib/useSendMessageWhenMount";
import styles from "./Chat.module.scss";
import { MessageSkeletons } from "./MessageSkeletons/MessageSkeletons";
import { ScrollButton } from "./ScrollButton/ScrollButton";

interface Props {
  chatVariant: ChatVariant;
}

export const Chat = ({ chatVariant }: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const messageFromTag = searchParams.get("message");
  const botFromTag = searchParams.get("bot");

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
  }, [refetch, setAnimateText]);

  const { sendMessage, setLoading } = useChatMessage(
    chatVariant,
    setIsGPTMessageLoading,
    setIsGPTMessageStreaming
  );

  useEffect(() => {
    if (messageFromTag && botFromTag) {
      sendMessage({ content: messageFromTag });
      router.replace(pathname);
    }
  }, [messageFromTag, botFromTag, sendMessage]);

  const handleLocalTagClick = (tag: { description: string }) => {
    sendMessage({ content: tag.description });
  };

  return (
    <Stack className={styles.container}>
      {messages.length === 0 ? (
        <div className={styles.animateLogo}>
          <AnimatedChatLogo />
        </div>
      ) : null}
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
        {messages.length === 0 && isMessageLoading && !hasData ? (
          <ChatTabs onLocalTagClick={handleLocalTagClick} />
        ) : null}

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
