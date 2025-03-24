import { useQuery } from '@tanstack/react-query';
import { getUserData } from '../api';

export const useGetUser = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserData(),
  });
};
