import { getPasswordSchema } from 'shared/schemas';
import { InferType, object, ref, string } from 'yup';

export const changePasswordSchema = object({
  old_password: getPasswordSchema(),
  new_password: getPasswordSchema(),
  confirmPassword: getPasswordSchema({
    requiredHelperText: 'Подтверждение пароля обязательно',
  }).oneOf([ref('new_password')], 'Пароли должны совпадать'),
});

export type ChangePasswordSchema = InferType<typeof changePasswordSchema>;
