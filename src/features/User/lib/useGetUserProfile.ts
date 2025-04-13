import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api';
import { useGetUser } from './useGetUser';

export const useGetUserProfile = () => {
  const { data } = useGetUser();

  return useQuery({
    queryKey: ['user-profile'],
    queryFn: () => getUserProfile(),
    enabled: !!data,
  });
};
