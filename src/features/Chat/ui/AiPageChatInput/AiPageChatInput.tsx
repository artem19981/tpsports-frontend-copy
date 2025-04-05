'use client';

import { useMediaQuery } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { ChatType } from 'entities/chat/model/ChatType';
import { useChatType } from 'entities/chat/ui';
import { SendMessageDto } from 'features/Chat/model';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChatInput } from '../ChatInput/ChatInput';
import { useSetOptimisticChatMessage } from 'entities/chat/lib';
import { ChatTabs } from '../ChatTabs/ChatTabs';

interface Props {
  disabled: boolean;
}

export const AiPageChatInput = ({ disabled }: Props) => {
  const router = useRouter();
  const chatTypeContext = useChatType();

  const setOptimisticChatMessage = useSetOptimisticChatMessage();

  const [loading, setLoading] = useState(false);

  const chatType = chatTypeContext?.chatType || ChatType.Trainer;
  const isMobile = useMediaQuery('(max-width: 650px)');
  const mutation = useMutation({
    mutationFn: async (payload: Omit<SendMessageDto, 'bot_name'>) => payload,
    onSuccess: (data) => {
      setOptimisticChatMessage(data);
      router.push('/ai/chat/' + chatType);
    },
  });

  const onSendMessage = async (payload: Omit<SendMessageDto, 'bot_name'>) => {
    if (!chatTypeContext?.chatType) {
      console.log('redirecter');
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
