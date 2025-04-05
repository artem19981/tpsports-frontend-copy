import { MainLayout } from "app/Layouts";
import { ChatTypeProvider } from "entities/chat/ui";

import { getUserData } from "features/User/api";
import { redirect } from "next/navigation";

import classNames from "classnames";
import styles from "./AiPage.module.scss";

import { Stack, Typography } from "@mui/material";
import { MultiChatSelect } from "features/Chat/ui/ChatsSelect/MultiChatSelect";
import { PageContent } from "./PageContent";

import Logo from "@/app/assets/images/aiChat/logo/logo.png";
import Image from "next/image";

export async function AiPage() {
  const userData = await getUserData().catch(() => {
    redirect("/logout");
  });

  return (
    <ChatTypeProvider>
      <MainLayout
        containerClassName={styles.layout}
        contentClassName={styles.content}
        childrenClassName={classNames(styles.children, "hide-scroll")}
        links={<MultiChatSelect isUserAuthorized={!!userData} />}
      >
        <Stack gap={3.5} alignItems={"center"} className={styles.container}>
          <Typography variant="h1" sx={{ fontSize: 45, textAlign: "center" }}>
            Привет, я твой{" "}
            <Image src={Logo} alt="logo" className={styles.logo} /> Ассистент.
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
        </Stack>

        <PageContent userData={userData} />
      </MainLayout>
    </ChatTypeProvider>
  );
}
