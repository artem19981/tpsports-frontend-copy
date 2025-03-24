import axios from 'axios';

export const handleEditNames = async (name1: any, name2: any, token: any, setUserData: any) => {
  try {
    const response = await axios.post('https://api-danidimitrievna.amvera.io/users/names', {
      name1: name1,
      name2: name2,
      token: token,
    });
    setUserData(response.data); // Обновление состояния пользователя
  } catch (err: any) {}
};
export const handleEditPhone = async (phone_number: any, token: any, setUserData: any) => {
  try {
    const response = await axios.post('https://api-danidimitrievna.amvera.io/users/phone_number', {
      phone_number: phone_number,
      token: token,
    });
    setUserData(response.data); // Обновление состояния пользователя
  } catch (err: any) {}
};
export const handleEditEmail = async (email: any, token: any, setUserData: any) => {
  try {
    const response = await axios.post('https://api-danidimitrievna.amvera.io/users/email', {
      email: email,
      token: token,
    });
    localStorage.setItem('accessToken', response.data.access_token);
    setUserData(response.data.user); // Обновление состояния пользователя
  } catch (err: any) {}
};
export const handleEditPassword = async (inputPasswordSettings: any, token: any, setUserData: any) => {
  try {
    const response = await axios.post('https://api-danidimitrievna.amvera.io/users/password', {
      old_password: inputPasswordSettings.old_password,
      new_password: inputPasswordSettings.new_password,
      token: token,
    });
    setUserData(response.data); // Обновление состояния пользователя
  } catch (err: any) {
    alert(err.response?.data?.detail);
  }
};
