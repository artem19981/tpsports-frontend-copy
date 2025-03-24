import {
  MutationFunction,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useLogoutUser = (
  fn: MutationFunction<void, void>,
  onSuccess?: () => void
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      onSuccess?.();
    },
  });
};
