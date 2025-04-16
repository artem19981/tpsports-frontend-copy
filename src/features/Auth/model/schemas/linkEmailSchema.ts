import { emailSchema } from 'shared/schemas';
import { InferType, object } from 'yup';

export const linkEmailSchema = object({
  email: emailSchema,
});

export type LinkEmailSchema = InferType<typeof linkEmailSchema>;
