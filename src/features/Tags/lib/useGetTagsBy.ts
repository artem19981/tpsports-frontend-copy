import { useQuery } from "@tanstack/react-query";
import { getTagsBy } from "../api";

export const useGetTagsBy = (bot_name: any) => {
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getTagsBy(bot_name),
  });
};
