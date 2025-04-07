import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'shared/constants/query-keys';
import { ACTIVE_CHAT_ID_LOCAL_STORAGE_KEY } from '../config/activeChatIdLocalStorageKey';
import { useSearchParams } from 'next/navigation';
import { CHAT_ID_QUERY_PARAM } from 'entities/chat/config';

export const useGetActiveChatId = () => {
  const searchParams = useSearchParams();

  return useQuery({
    queryKey: [QueryKeys.ActiveChatId],
    queryFn: () => {
      const id = localStorage.getItem(ACTIVE_CHAT_ID_LOCAL_STORAGE_KEY);

      if (id) return +id;

      const idFromParams = searchParams.get(CHAT_ID_QUERY_PARAM);

      return idFromParams ? +idFromParams : null;
    },
    initialData: () => {
      const id = localStorage.getItem(ACTIVE_CHAT_ID_LOCAL_STORAGE_KEY);

      if (id) return +id;

      const idFromParams = searchParams.get(CHAT_ID_QUERY_PARAM);

      return idFromParams ? +idFromParams : null;
    },
  }).data as number | null;
};

export const useSetActiveChatId = () => {
  const queryClient = useQueryClient();

  return (id: number | null) =>
    queryClient.setQueryData([QueryKeys.ActiveChatId], () => {
      if (!id) {
        localStorage.removeItem(ACTIVE_CHAT_ID_LOCAL_STORAGE_KEY);
      } else {
        localStorage.setItem(ACTIVE_CHAT_ID_LOCAL_STORAGE_KEY, id.toString());
      }

      return id;
    });
};
