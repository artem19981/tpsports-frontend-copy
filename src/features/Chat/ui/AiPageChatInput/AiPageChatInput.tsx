"use client";

import Logo from "@/app/assets/images/aiChat/logo/logo.png";
import { Stack, Typography } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatType } from "entities/chat/model/ChatType";
import { useChatType } from "entities/chat/ui";
import { SendMessageDto } from "features/Chat/model";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatInput } from "../ChatInput/ChatInput";
import styles from "./AiPageChatInput.module.scss";

interface Props {
  disabled: boolean;
}

export const AiPageChatInput = ({ disabled }: Props) => {
  const router = useRouter();
  const chatTypeContext = useChatType();
  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);

  const chatType = chatTypeContext?.chatType || ChatType.Trainer;

  const mutation = useMutation({
    mutationFn: async (payload: Omit<SendMessageDto, "bot_name">) => payload,
    onSuccess: (data) => {
      queryClient.setQueryData(["chatMessage"], data);
      router.push("/ai/chat/" + chatType);
    },
  });

  const onSendMessage = async (payload: Omit<SendMessageDto, "bot_name">) => {
    mutation.mutate(payload);
  };

  return (
    <>
      <Stack gap={3.5} alignItems={"center"} className={styles.container}>
        <Typography variant="h1" sx={{ fontSize: 45 }}>
          Привет, я твой <Image src={Logo} alt="logo" className={styles.logo} />{" "}
          Ассистент.
        </Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>
          Ты можешь выбрать Ассистента или написать мне, и я отправлю тебя к
          нужному Ассистенту: Тренеру, Доктору, Нутрициологу или Психологу и
          отвечу на твой вопрос
        </Typography>
      </Stack>
      <ChatInput
        onSendMessage={onSendMessage}
        isPending={loading}
        disabled={disabled}
        setLoading={setLoading}
      />
    </>
  );
};
