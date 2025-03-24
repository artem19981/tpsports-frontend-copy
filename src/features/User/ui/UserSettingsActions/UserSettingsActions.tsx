"use client";

import { Stack } from "@mui/material";

import {
  logoutUserFromAllDevices,
  logoutUser as onLogout,
} from "features/Auth/api";
import { useLogoutUser } from "features/Auth/lib/useLogoutUser";
import { useRouter } from "next/navigation";
import { Button } from "shared/ui";

import { useQueryClient } from "@tanstack/react-query";
import { revalidatePath } from "next/cache";
import styles from "./UserSettingsActions.module.scss";

export const UserSettingsActions = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const logoutUser = useLogoutUser(onLogout, afterLogout);
  const logoutFromAllDevices = useLogoutUser(
    logoutUserFromAllDevices,
    afterLogout
  );

  function afterLogout() {
    queryClient.clear();
    router.push("/ai");
    revalidatePath("/");
  }

  const disableLogouts = logoutUser.isPending || logoutFromAllDevices.isPending;

  return (
    <Stack direction="column" gap={3}>
      <Button variant="gray" href="/tariff">
        Мой тариф
      </Button>
      <Button
        variant="transparent"
        className={styles.logout}
        onClick={() => logoutFromAllDevices.mutate()}
        disabled={disableLogouts}
      >
        Выйти со всех устройств
      </Button>

      <Button
        variant="white"
        onClick={() => logoutUser.mutate()}
        disabled={disableLogouts}
      >
        Выход
      </Button>
    </Stack>
  );
};
