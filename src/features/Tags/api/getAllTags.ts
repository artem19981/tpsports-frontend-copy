"use server";

import { axiosInstance, withTokenInterceptor } from "shared/api";

export const getAllTags = async () => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance.get("/tags", {
      headers: { Authorization: `Bearer ${token}` },
    })
  );
  return data;
};
