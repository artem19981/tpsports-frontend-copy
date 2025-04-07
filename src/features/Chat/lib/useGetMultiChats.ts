import { useQuery } from '@tanstack/react-query';
import { getMultiChats } from '../api';
import { FrontendMultiChat } from '../model';
import { QueryKeys } from 'shared/constants/query-keys';
import { ChatType } from 'entities/chat/model/ChatType';
import { useSnackbar } from 'shared/ui';
import { INITIAL_MULTI_CHATS } from '../config/initialMultiChatsData';
import { useGetUser } from 'features/User/lib';

const INITIAL_DATA = {
  chats: {
    allChats: [],
    favoriteChats: [],
  },
  chatsByAssistants: INITIAL_MULTI_CHATS,
};

export const useGetMultiChats = () => {
  const snackbar = useSnackbar();

  const { data } = useGetUser();

  return useQuery<{
    chats: FrontendMultiChat;
    chatsByAssistants: Record<ChatType, FrontendMultiChat>;
  }>({
    queryKey: [QueryKeys.MultiChats],
    queryFn: async () => {
      try {
        const data = await getMultiChats();

        return data;
      } catch (error) {
        snackbar('Не удалось загрузить чаты', 'error');
        console.error('Failed to fetch chats:', error);

        return INITIAL_DATA;
      }
    },
    initialData: INITIAL_DATA,
    staleTime: 0,
    retry: 2,
    enabled: !!data,
  });
};
