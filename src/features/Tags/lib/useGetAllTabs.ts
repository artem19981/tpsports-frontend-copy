import { useQuery } from "@tanstack/react-query";
import { getAllTags } from "../api";

export const useGetAllTags = () => {
  return useQuery({
    queryKey: ["tabs"],
    queryFn: () => getAllTags(),
  });
};
