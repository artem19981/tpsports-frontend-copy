import { UserProfile } from 'features/User/model';

export const getUserInitials = (data: UserProfile | undefined) => {
  let initials = '';

  if (data?.first_name) {
    initials += data.first_name.charAt(0).toUpperCase();
  }

  return initials;
};
