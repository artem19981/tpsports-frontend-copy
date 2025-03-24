import { UserDto } from '../../User/model/User';

export interface LoginDto {
  access_token: string;
  token_type: string;
  user: UserDto;
}
