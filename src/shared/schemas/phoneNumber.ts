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

function validatePhoneNumber(phone: string): boolean {
  if (phone.startsWith('+8')) {
    return false;
  }

  const cleanedPhone = phone.replace(/[^\d+]/g, '');

  return (
    (cleanedPhone.startsWith('+7') && cleanedPhone.length === 12) ||
    (cleanedPhone.startsWith('8') && cleanedPhone.length === 11)
  );
}
