import { availableFileTypes } from 'entities/chat/ui';

export const validateUploadedFiles = (files: FileList | File[]) => {
  return Array.from(files).filter((file) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension && Object.keys(availableFileTypes).includes(extension);
  });
};
