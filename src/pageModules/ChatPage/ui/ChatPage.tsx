"use client";

import { MainLayout } from "app/Layouts";
import { ChatType } from "entities/chat/model/ChatType";
import { ChatTypeProvider } from "entities/chat/ui";
import { ChatVariant } from "features/Chat/model";
import { MultiChatSelect } from "features/Chat/ui/ChatsSelect/MultiChatSelect";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { Chat } from "widgets/Chat";
import styles from "./ChatPage.module.scss";

interface Props {
  chatVariant: ChatVariant;
}

export const ChatPage = ({ chatVariant }: Props) => {
  const router = useRouter();

  const onChangeChat = useCallback(
    (type: string) => {
      router.push(`/ai/chat/${type}`);
    },
    [router]
  );

  return (
    <ChatTypeProvider defaultValue={chatVariant as ChatType}>
      <MainLayout
        containerClassName={styles.layoutContainer}
        contentClassName={styles.content}
        links={<MultiChatSelect onChange={onChangeChat} isUserAuthorized />}
      >
        <Chat chatVariant={chatVariant} />
      </MainLayout>
    </ChatTypeProvider>
  );
};
