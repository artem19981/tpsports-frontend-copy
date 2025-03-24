import { uploadFile } from 'features/Chat/api';
// import { UploadFileDto } from 'features/Chat/model';
// import { axiosInstance } from 'shared/api';

// fetch('http://89.169.149.217:8090/upload_file', {
//   headers: {
//     accept: 'application/json',
//     'accept-language': 'en,en-US;q=0.9,ru;q=0.8',
//     'content-type':
//       'multipart/form-data; boundary=----WebKitFormBoundaryXzIPAfnFu99YRVHI',
//   },
//   referrer: 'http://89.169.149.217:8090/docs',
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: '------WebKitFormBoundaryXzIPAfnFu99YRVHI\r\nContent-Disposition: form-data; name="file"; filename="2025.02.08 Onboarding.pdf"\r\nContent-Type: application/pdf\r\n\r\n\r\n------WebKitFormBoundaryXzIPAfnFu99YRVHI--\r\n',
//   method: 'POST',
//   mode: 'cors',
//   credentials: 'omit',
// });

// fetch('http://89.169.149.217:8090/upload_file', {
//   headers: {
//     accept: 'application/json',
//     'accept-language': 'en,en-US;q=0.9,ru;q=0.8',
//     authorization:
//       'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbm8ub2xpbXBAZ21haWwuY29tIiwiZXhwIjoxNzQyNTY3NjcyfQ.kDYOUbo6IXZm1khSSkX496a4Ga-EfB4hPYse3xiEM_M',
//     'content-type':
//       'multipart/form-data; boundary=----WebKitFormBoundaryGd5i4byXJrRXBBZ5',
//   },
//   referrer: 'http://localhost:3000/',
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: '------WebKitFormBoundaryGd5i4byXJrRXBBZ5\r\nContent-Disposition: form-data; name="file"; filename="2025.02.08 Onboarding.pdf"\r\nContent-Type: application/pdf\r\n\r\n\r\n------WebKitFormBoundaryGd5i4byXJrRXBBZ5--\r\n',
//   method: 'POST',
//   mode: 'cors',
//   credentials: 'include',
// });

// const uploadFile = async (payload: FormData) => {
//   console.log('Отправка файла:', payload.get('file'));

//   const request = new Request('http://89.169.149.217:8090/upload_file', {
//     method: 'POST',
//     body: payload,
//   });

//   const body = await request.arrayBuffer(); // Бинарные данные запроса
//   console.log('Бинарный код запроса:', new Uint8Array(body));

//   const response = await fetch('http://89.169.149.217:8090/upload_file', {
//     method: 'POST',
//     body: payload, // ✅ Используем FormData для отправки файла
//     headers: {
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbm8ub2xpbXBAZ21haWwuY29tIiwiZXhwIjoxNzQyNTY3NjcyfQ.kDYOUbo6IXZm1khSSkX496a4Ga-EfB4hPYse3xiEM_M`,
//       accept: 'application/json',
//       // ❌ НЕ указываем Content-Type! fetch сам выставит boundary
//     },
//   });

//   if (!response.ok) {
//     throw new Error(`Ошибка: ${response.status}`);
//   }

//   const data = await response.json();

//   // const { data } = await axiosInstance.post<UploadFileDto>(
//   //   `http://backend.tpsports.com:8090/upload_file`,
//   //   payload,
//   //   {
//   //     headers: {
//   //       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRpbm8ub2xpbXBAZ21haWwuY29tIiwiZXhwIjoxNzQyNTY3NjcyfQ.kDYOUbo6IXZm1khSSkX496a4Ga-EfB4hPYse3xiEM_M`,
//   //       // 'Content-Type': 'application/octet-stream',
//   //       Accept: 'application/json',
//   //       'content-type':
//   //         'multipart/form-data; boundary=----WebKitFormBoundaryaBguNYV87YlOZXTA',

//   //       // 'Content-Type': 'multipart/form-data',
//   //       // 'Content-Disposition': 'attachment',
//   //     },
//   //   }
//   // );

//   return data.file_id;
// };

// fetch('http://89.169.149.217:8090/upload_file', {
//   headers: {
//     accept: 'application/json',
//     'accept-language': 'en,en-US;q=0.9,ru;q=0.8',
//     'content-type':
//       'multipart/form-data; boundary=----WebKitFormBoundaryOFkQFk8dG86Zld6L',
//   },
//   referrer: 'http://89.169.149.217:8090/docs',
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: '------WebKitFormBoundaryOFkQFk8dG86Zld6L\r\nContent-Disposition: form-data; name="file"; filename="2025.01.24 Settings.pdf"\r\nContent-Type: application/pdf\r\n\r\n\r\n------WebKitFormBoundaryOFkQFk8dG86Zld6L--\r\n',
//   method: 'POST',
//   mode: 'cors',
//   credentials: 'omit',
// });

// fetch('https://tpsports.com/ai/chat/medic', {
//   headers: {
//     accept: 'text/x-component',
//     'accept-language': 'en,en-US;q=0.9,ru;q=0.8',
//     'content-type':
//       'multipart/form-data; boundary=----WebKitFormBoundarygrObOv1eO7ROuEyQ',
//     'next-action': '677d0156b0de432df46eefd49a35f13ff097cac1',
//     'next-router-state-tree':
//       '%5B%22%22%2C%7B%22children%22%3A%5B%22ai%22%2C%7B%22children%22%3A%5B%22chat%22%2C%7B%22children%22%3A%5B%5B%22chatType%22%2C%22medic%22%2C%22c%22%5D%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2C%22%2Fai%2Fchat%2Fmedic%22%2C%22refresh%22%5D%7D%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
//     priority: 'u=1, i',
//     'sec-ch-ua':
//       '"Chromium";v="134", "Not:A-Brand";v="24", "Google Chrome";v="134"',
//     'sec-ch-ua-mobile': '?0',
//     'sec-ch-ua-platform': '"macOS"',
//     'sec-fetch-dest': 'empty',
//     'sec-fetch-mode': 'cors',
//     'sec-fetch-site': 'same-origin',
//   },
//   referrer: 'https://tpsports.com/ai/chat/medic',
//   referrerPolicy: 'strict-origin-when-cross-origin',
//   body: '------WebKitFormBoundarygrObOv1eO7ROuEyQ\r\nContent-Disposition: form-data; name="1_file"; filename="2025.02.08 Onboarding.pdf"\r\nContent-Type: application/pdf\r\n\r\n\r\n------WebKitFormBoundarygrObOv1eO7ROuEyQ\r\nContent-Disposition: form-data; name="0"\r\n\r\n["$K1"]\r\n------WebKitFormBoundarygrObOv1eO7ROuEyQ--\r\n',
//   method: 'POST',
//   mode: 'cors',
//   credentials: 'include',
// });

export const uploadFiles = async (
  files: File[],
  showSnackbar: (message: string, type: 'error' | 'info') => void
) => {
  const filesFormData = await Promise.allSettled(
    files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);

      return uploadFile(formData);
    })
  );

  const uploadedFileIds = filesFormData.reduce((acc: string[], file) => {
    if (file.status === 'fulfilled') {
      acc.push(file.value);
    }

    return acc;
  }, []);

  if (uploadedFileIds.length !== files.length && uploadedFileIds.length > 0) {
    showSnackbar('Не удалось загрузить все файлы', 'info');
  }

  if (files.length !== 0 && uploadedFileIds.length === 0) {
    showSnackbar('Не удалось загрузить файлы', 'error');
  }

  return uploadedFileIds;
};
