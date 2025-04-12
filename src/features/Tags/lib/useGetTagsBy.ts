import { useQuery } from '@tanstack/react-query';
import { getTagsBy } from '../api';

export const useGetTagsBy = (bot_name: any) => {
  return useQuery({
    queryKey: ['tabs', bot_name],
    queryFn: () => getTagsBy(bot_name),
    enabled: !!bot_name,
  });
};
