import axios from 'axios';

import { getDataFromLocalStorage } from '@/app/services/UserRequests';
import { bots } from '@/app/utils/bd';

export const fetchUserMessages = async (setUserData: any, email: string, newBot: string, setUserMessages: any) => {
  try {
    const response: any = await axios.get(`https://api-danidimitrievna.amvera.io/user_messages`, {
      params: {
        email: email,
        botName: newBot,
      },
    });

    const messages = response.data.messages;
    const dialogueId = response.data.dialogue_id;
    const messagesLimit = response.data.messages_limit;
    const usedLimit = response.data.used_limit;

    // Установим сообщения и идентификатор диалога
    setUserMessages(messages);
    setUserData((prevData: any) => ({
      ...prevData,
      messages_limit: messagesLimit,
      used_limit: usedLimit,
    }));
    // Проверим длину сообщений и сохраним их в localStorage, если есть
    if (messages.length > 0) {
      localStorage.setItem(`userMessages_${email}_${newBot}`, JSON.stringify(messages));
    }

    return {
      dialogueId: dialogueId,
      messages: messages,
    };
  } catch (error: any) {
    console.error('Ошибка при получении диалогов:', error.response ? error.response.data : error.message);
  }
};

export const fetchUserMessagesNoload = async (setUserData: any, email: string, newBot: string, setUserMessages: any) => {
  try {
    const response: any = await axios.get(`https://api-danidimitrievna.amvera.io/user_messages_noload`, {
      params: {
        email: email,
        botName: newBot,
      },
    });

    const messages = response.data.messages;
    const dialogueId = response.data.dialogue_id;
    const messagesLimit = response.data.messages_limit;
    const usedLimit = response.data.used_limit;
    // Установим сообщения и идентификатор диалога
    setUserMessages(messages);
    setUserData((prevData: any) => ({
      ...prevData,
      messages_limit: messagesLimit,
      used_limit: usedLimit,
    }));
    // Проверим длину сообщений и сохраним их в localStorage, если есть
    if (messages.length > 0) {
      localStorage.setItem(`userMessages_${email}_${newBot}`, JSON.stringify(messages));
    }

    return {
      dialogueId: dialogueId,
      messages: messages,
    };
  } catch (error: any) {
    console.error('Ошибка при получении диалогов:', error.response ? error.response.data : error.message);
  }
};

export const rateMessage = async (messageId: string, rate: 'like' | 'dislike' | 'not rated') => {
  try {
    const response = await axios.post('https://api-danidimitrievna.amvera.io/message/rate', {
      message_id: messageId,
      rate: rate,
    });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Логируем ошибку, если это ошибка Axios
      console.error('Ошибка при изменении рейтинга сообщения:', error.response?.data);
      throw new Error(error.response?.data.detail || 'Ошибка при изменении рейтинга сообщения');
    } else {
      // Для других ошибок
      console.error('Неизвестная ошибка:', error);
      throw new Error('Неизвестная ошибка при изменении рейтинга сообщения');
    }
  }
};

export const submitMessage = async (newMessage: any) => {
  try {
    const response = await axios.post(`https://api-danidimitrievna.amvera.io/${newMessage.selectedBot}`, newMessage, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('Ошибка:', error.response ? error.response.data : error.message);
  }
};
export const submitMessageRedirecter = async (newMessage: any, bots: any, email: any, setUserData: any, setUserMessages: any) => {
  try {
    const response = await axios.post(`https://api-danidimitrievna.amvera.io/redirecter`, newMessage, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const botName = response.data.response.data[0].content[0].text.value;

    // Создаем newBot на основе botName
    const newBot = {
      name: botName,
      translation: bots.find((bot: any) => bot?.name === botName)?.translation,
    };
    const safeJsonParse = (data: string | null): any => {
      try {
        return data ? JSON.parse(data) : null; // Возвращаем null, если data пустое
      } catch (error) {
        console.error('Ошибка при парсинге данных:', error);
        return null; // В случае ошибки возвращаем null
      }
    };

    // Формируем ключ для получения сообщений
    const key = `userMessages_${email}_${botName}`;

    // Получение и парсинг пользовательских сообщений
    const storedMessages = localStorage.getItem(key);
    const parsedMessages = safeJsonParse(storedMessages);

    if (parsedMessages) {
      setUserMessages(parsedMessages);
    } else {
      await fetchUserMessages(setUserData, email, botName, setUserMessages);
    }

    // Возвращаем newBot
    return newBot;
  } catch (error: any) {
    console.error('Ошибка:', error?.response ? error?.response?.data : error.message);
  }
};
