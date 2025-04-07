import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from 'shared/constants/query-keys';

export const useMyHealthModal = () => {
  const queryClient = useQueryClient();

  const { data: open } = useQuery({
    queryKey: [QueryKeys.MyHealthModal],
    initialData: false,
  });

  const setOpen = (open: boolean) => queryClient.setQueryData([QueryKeys.MyHealthModal], open);

  return [open, setOpen] as [boolean, typeof setOpen];
};
