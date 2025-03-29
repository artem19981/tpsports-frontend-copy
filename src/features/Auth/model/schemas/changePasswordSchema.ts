import { getPasswordSchema } from 'shared/schemas';
import { InferType, object, ref } from 'yup';

export const resetPasswordSchema = object({
  password: getPasswordSchema(),
  confirmPassword: getPasswordSchema({
    requiredHelperText: 'Подтверждение пароля обязательно',
  }).oneOf([ref('password')], 'Пароли должны совпадать'),
});

export type ResetPasswordSchema = InferType<typeof resetPasswordSchema>;
