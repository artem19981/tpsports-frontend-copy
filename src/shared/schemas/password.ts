import { string } from 'yup';

interface PasswordSchema {
  requiredHelperText?: string;
  confirmPassword?: string;
}

export const getPasswordSchema = (texts?: PasswordSchema) => {
  const helperTexts = {
    requiredHelperText: 'Введите пароль',
    confirmPassword: 'Пароль должен содержать не менее 12 символов',
    ...texts,
  };

  return string()
    .required(helperTexts.requiredHelperText)
    .test('check password', function (value, { createError }) {
      if (validatePassword(value)) {
        return true;
      }

      return createError({ message: helperTexts.confirmPassword });
    });
};

export const validatePassword = (password: string) => {
  const containsEmoji = (str: string) => {
    const emojiRegex = /[\u203C-\u3299\uD83C-\uDBFF\uD83E-\uDBBF]/;
    return emojiRegex.test(str);
  };

  return password.length >= 12 && !containsEmoji(password);
};
