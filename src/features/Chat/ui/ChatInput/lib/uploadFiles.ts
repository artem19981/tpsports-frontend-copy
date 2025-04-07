import { uploadFile } from 'features/Chat/api';

export const uploadFiles = async (
  files: File[],
  showSnackbar: (message: string, type: 'error' | 'info') => void,
) => {
  const filesFormData = await Promise.allSettled(
    files.map((file) => {
      const formData = new FormData();
      formData.append('file', file);

      return uploadFile(formData);
    }),
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
