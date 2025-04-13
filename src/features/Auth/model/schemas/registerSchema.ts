import { getPasswordSchema } from 'shared/schemas';
import { InferType, object, ref } from 'yup';
import { loginSchema } from './loginSchema';

export const registerSchema = object({
  confirmPassword: getPasswordSchema({
    requiredHelperText: 'Подтверждение пароля обязательно',
  }).oneOf([ref('password')], 'Пароли должны совпадать'),
}).concat(loginSchema);

export type RegisterSchema = InferType<typeof registerSchema>;
