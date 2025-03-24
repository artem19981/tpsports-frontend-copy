import { useQuery } from '@tanstack/react-query';
import { getActiveChats } from '../api/getActiveChats';

export const useGetActiveChats = (isUserAuthorized: boolean) => {
  return useQuery({
    queryKey: ['active-chats'],
    queryFn: () => getActiveChats(),
    staleTime: 0,
    retry: 2,
    enabled: isUserAuthorized,
  });
};
