export const validateEmail = (email: string) => {
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const containsEmoji = (str: string) => {
    const emojiRegex = /[\u203C-\u3299\uD83C-\uDBFF\uD83E-\uDBBF]/;
    return emojiRegex.test(str);
  };

  return emailRegex.test(email) && !containsEmoji(email);
};

export const validatePassword = (password: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])[A-Za-z\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]{8,20}$/;

  const containsEmoji = (str: string) => {
    const emojiRegex = /[\u203C-\u3299\uD83C-\uDBFF\uD83E-\uDBBF]/;
    return emojiRegex.test(str);
  };

  return passwordRegex.test(password) && !containsEmoji(password);
};

export const validatePhoneNumber = (phone: string): boolean => {
  const cleanedPhone = phone.replace(/[^\d+]/g, '');

  const phoneRegex = /^\+?\d{7,15}$/;

  return phoneRegex.test(cleanedPhone);
};

export const validateName = (name: string): boolean => {
  const nameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  const containsEmoji = (str: string) => {
    const emojiRegex = /[\u203C-\u3299\uD83C-\uDBFF\uD83E-\uDBBF]/;
    return emojiRegex.test(str);
  };

  return nameRegex.test(name) && !containsEmoji(name);
};

export const validateSurname = (surname: string): boolean => {
  const surnameRegex = /^[A-Za-zА-Яа-яЁё\s-]+$/;
  const containsEmoji = (str: string) => {
    const emojiRegex = /[\u203C-\u3299\uD83C-\uDBFF\uD83E-\uDBBF]/;
    return emojiRegex.test(str);
  };

  return surnameRegex.test(surname) && !containsEmoji(surname);
};
