import { emailSchema, getPasswordSchema } from 'shared/schemas';
import { InferType, object, string } from 'yup';

export const loginSchema = object({
  email: emailSchema,
  password: getPasswordSchema(),
});

export type LoginFormSchema = InferType<typeof loginSchema>;
