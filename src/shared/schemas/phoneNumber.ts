import { isValidPhoneNumber } from 'react-phone-number-input';
import { string } from 'yup';

export const phoneNumberSchema = string()
  .transform((value) => (value === '' ? undefined : value))
  .test('check tMin have value', function (value, { createError }) {
    if (!value || isValidPhoneNumber(value)) {
      return true;
    }

    return createError({ message: 'Введите корректный номер телефона' });
  });
