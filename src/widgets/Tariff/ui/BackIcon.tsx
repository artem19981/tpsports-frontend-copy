"use client";

import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC } from "react";
import Back from "shared/assets/Back.svg?component";
import styles from "./Tariff.module.scss";

interface Props {
  down?: boolean;
}

export const BackIcon: FC<Props> = ({ down }) => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Box
        sx={{
          display: "flex",
          gap: 2.5,
          alignItems: "center",
          mb: down === true ? 0 : 10,
          mt: down === true ? 9 : 0,
          cursor: "pointer",
        }}
        onClick={() => {
          router.push("/user-settings");
        }}
      >
        <Back />
        <Typography>Назад к настройкам</Typography>
      </Box>
    </div>
  );
};
