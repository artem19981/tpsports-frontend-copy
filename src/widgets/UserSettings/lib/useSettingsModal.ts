import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'shared/constants/query-keys';

export const useSettingsModal = () => {
  const queryClient = useQueryClient();

  const { data: open } = useQuery({
    queryKey: [QueryKeys.SettingsModal],
    initialData: false,
  });

  const setOpen = (open: boolean) => queryClient.setQueryData([QueryKeys.SettingsModal], open);

  return [open, setOpen] as [boolean, typeof setOpen];
};
