import { phoneNumberSchema } from 'shared/schemas';
import { birthdaySchema } from 'shared/schemas/birthdaySchema';
import { InferType, object, string } from 'yup';

export const userSettingsSchema = object({
  first_name: string(),
  last_name: string(),
  phone_number: phoneNumberSchema,
  birth_date: birthdaySchema,
  email: string(),
});

export type UserSettingsSchema = InferType<typeof userSettingsSchema>;
