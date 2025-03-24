import { string } from 'yup';

export const emailSchema = string()
  .required('Введите адрес электронной почты')
  .test('check tMin have value', function (value, { createError }) {
    if (validateEmail(value)) {
      return true;
    }

    return createError({ message: 'Введите корректный адрес электронной почты' });
  });

function validateEmail(email: string) {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const containsEmoji = (str: string) => {
    const emojiRegex = /[\u203C-\u3299\uD83C-\uDBFF\uD83E-\uDBBF]/;
    return emojiRegex.test(str);
  };

  return emailRegex.test(email) && !containsEmoji(email);
}
