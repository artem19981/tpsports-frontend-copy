import { phoneNumberSchema } from 'shared/schemas';
import { birthdaySchema } from 'shared/schemas/birthdaySchema';
import { InferType, object, string } from 'yup';

export const personalInformationSchema = object({
  first_name: string(),
  last_name: string(),
  birth_date: birthdaySchema,
  gender: string().oneOf(['мужчина', 'женщина']),
  phone_number: phoneNumberSchema,
});

export type PersonalInformationSchema = InferType<
  typeof personalInformationSchema
>;
