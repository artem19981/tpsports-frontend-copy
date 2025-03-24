import { UserProfile } from './User';

export interface UpdateUserPayload extends Partial<UserProfile> {}
