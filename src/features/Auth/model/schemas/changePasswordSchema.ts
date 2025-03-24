import { getPasswordSchema, validatePassword } from 'shared/schemas';
import { InferType, object, ref, string } from 'yup';

export const changePasswordSchema = object({
  password: getPasswordSchema(),
  confirmPassword: getPasswordSchema({
    requiredHelperText: 'Подтверждение пароля обязательно',
  }).oneOf([ref('password')], 'Пароли должны совпадать'),
});

export type ChangePasswordSchema = InferType<typeof changePasswordSchema>;
