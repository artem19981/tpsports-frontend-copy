'use client';

import { useMediaQuery } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useChatType } from 'entities/chat/ui';
import { SendMessageDto } from 'features/Chat/model';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatInput } from '../ChatInput/ChatInput';
import { useSetOptimisticChatMessage } from 'entities/chat/lib';
import { ChatTabs } from '../ChatTabs/ChatTabs';
import { sendMessageToRedirecter } from 'features/Chat/api';

interface Props {
  disabled: boolean;
}

export const AiPageChatInput = ({ disabled }: Props) => {
  const router = useRouter();
  const chatTypeContext = useChatType();

  const setOptimisticChatMessage = useSetOptimisticChatMessage();

  const [loading, setLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width: 650px)');
  const mutation = useMutation({
    mutationFn: async (payload: Omit<SendMessageDto, 'bot_name' | 'dialogue_id'>) => payload,
    onSuccess: (data) => {
      setOptimisticChatMessage({ ...data, bot_name: chatTypeContext?.chatType as string });
      router.push('/ai/chat/');
    },
  });

  const onSendMessage = async (payload: Omit<SendMessageDto, 'bot_name' | 'dialogue_id'>) => {
    if (!chatTypeContext?.chatType) {
      sendMessageToRedirecter(payload).then((data) => {
        console.log('redirect to', data.bot_name);

        setOptimisticChatMessage({
          ...payload,
          bot_name: data.bot_name,
        });
        router.push('/ai/chat/');
      });

      return;
    }

    mutation.mutate(payload);
  };

  return (
    <>
      {/* <Stack gap={3.5} alignItems={"center"} className={styles.container}>
        <Typography variant="h1" sx={{ fontSize: 45, textAlign: "center" }}>
          Привет, я твой <Image src={Logo} alt="logo" className={styles.logo} />{" "}
          Ассистент.
        </Typography>
        <Typography
          variant="body2"
          sx={{ textAlign: "center" }}
          className={styles.suptitle}
        >
          Ты можешь выбрать Ассистента или написать мне, и я отправлю тебя к
          нужному Ассистенту: Тренеру, Доктору, Нутрициологу или Психологу и
          отвечу на твой вопрос
        </Typography>
      </Stack> */}
      {isMobile && <ChatTabs />}

      <ChatInput
        onSendMessage={onSendMessage}
        isPending={loading}
        disabled={disabled}
        setLoading={setLoading}
      />
      {!isMobile && <ChatTabs />}
    </>
  );
};
