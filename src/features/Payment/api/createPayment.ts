"use server";

import { axiosInstance, withTokenInterceptor } from "shared/api";

export const createPayment = async () => {
  const { data } = await withTokenInterceptor((token: string) =>
    axiosInstance.post(
      "/payment-create",
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    )
  );
  return data;
};
