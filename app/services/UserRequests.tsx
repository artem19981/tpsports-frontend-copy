import axios from 'axios';

import { fetchUserMessages } from '@/app/services/AiRequests';

export const getDataFromLocalStorage = async (
  email: string,
  selectedBot: string,
  setUserData: React.Dispatch<React.SetStateAction<any>>,
  setUserMessages: React.Dispatch<React.SetStateAction<any>>
) => {
  const safeJsonParse = (data: string | null): any => {
    try {
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Ошибка при парсинге данных:', error);
      return null;
    }
  };

  const key = `userMessages_${email}_${selectedBot}`;

  const storedMessages = localStorage.getItem(key);
  const parsedMessages = safeJsonParse(storedMessages);

  if (parsedMessages) {
    setUserMessages(parsedMessages);
  } else {
    fetchUserMessages(setUserData, email, selectedBot, setUserMessages);
  }
};

export const clearUser = () => {
  localStorage.removeItem('userInfo');
  for (let i = localStorage.length - 1; i >= 0; i--) {
    const key = localStorage.key(i);

    if (key && key.startsWith('userMessages_')) {
      localStorage.removeItem(key);
      console.log(`Удалено:${key}`);
    }
  }
  console.log('Все данные удалены из localStorage.');
};

export const handleLogin = async (
  changeCurrentPageOption: any,
  email: any,
  password: any,
  setUserData: any
) => {
  try {
    const response = await axios.post(
      'https://api-danidimitrievna.amvera.io/login',
      {
        email: email,
        password: password,
      }
    );
    localStorage.setItem('accessToken', response.data.access_token);
    setUserData(response.data.user);
    changeCurrentPageOption('start');
  } catch (err: any) {
    alert(err.response?.data?.detail || 'An error occurred during login');
  }
};

export const handleSignup = async (userData: any) => {
  try {
    await axios.post('https://api-danidimitrievna.amvera.io/signup', {
      name1: userData.name1,
      name2: userData.name2,
      email: userData.email,
      phone_number: userData.phone_number,
      birth_date: userData.dateOfBirth,
      password: userData.password,
    });
    alert('Успешная регистрация. Теперь вы можете выполнить вход в аккаунт.');
  } catch (err: any) {
    alert(
      err.response?.data?.detail || 'An error occurred during registration'
    );
  }
};

export const increaseLimit = async (email: any) => {
  try {
    await axios.post('https://api-danidimitrievna.amvera.io/increase_limit', {
      email: email,
    });
  } catch (err: any) {}
};

export const handleLogout = async (email: any) => {
  try {
    await axios.post('https://api-danidimitrievna.amvera.io/logout', {
      email: email,
    });
  } catch (err: any) {}
};
export const handleAllLogout = async (email: any) => {
  try {
    await axios.post('https://api-danidimitrievna.amvera.io/logout-all', {
      email: email,
    });
  } catch (err: any) {}
};
