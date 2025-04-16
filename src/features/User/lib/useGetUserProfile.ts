import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api';
import { useGetUser } from './useGetUser';
import { QueryKeys } from 'shared/constants/query-keys';

export const useGetUserProfile = () => {
  const { data } = useGetUser();

  return useQuery({
    queryKey: [QueryKeys.UserProfile],
    queryFn: () => getUserProfile(),
    enabled: !!data,
  });
};
