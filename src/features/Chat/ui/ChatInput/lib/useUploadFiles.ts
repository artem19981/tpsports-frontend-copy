import {
  ClipboardEvent,
  DragEvent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useSnackbar } from 'shared/ui';
import { validateUploadedFiles } from './validateUploadedFiles';

export const useUploadFiles = () => {
  const [files, setFiles] = useState<File[]>([]);
  const fileNames = useMemo(() => files.map((file) => file.name), [files]);

  const showSnackbar = useSnackbar();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const uploadFileLikeDrop = (fileList: FileList) => {
    const validFiles = validateUploadedFiles(fileList);

    if (validFiles.length === 0) {
      showSnackbar('Файлы не соответствуют разрешённым форматам', 'error');
    } else {
      setFiles(validFiles);
    }
  };

  const onDropFile = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    uploadFileLikeDrop(event.dataTransfer.files);
  };

  const onAttachFiles = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files;

      if (selectedFile) {
        setFiles((prev) => [...prev, ...Array.from(selectedFile)]);
      }
    },
    []
  );

  const onDeleteFile = useCallback(
    (index: number) =>
      setFiles((prev) => prev.filter((_, idx) => idx !== index)),
    []
  );

  const onPaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    const pastedFiles: File[] = [];

    for (const item of Array.from(items)) {
      if (item.kind === 'file') {
        const file = item.getAsFile();
        if (file) pastedFiles.push(file);
      }
    }

    const validFiles = validateUploadedFiles(pastedFiles);

    if (pastedFiles.length > 0 && validFiles.length === 0) {
      e.preventDefault();
      showSnackbar('Файлы не соответствуют разрешённым форматам', 'error');

      return;
    }

    if (pastedFiles.length > validFiles.length) {
      showSnackbar(
        'Некоторые файлы не соответствуют разрешённым форматам',
        'info'
      );
    }

    if (validFiles.length > 0) {
      e.preventDefault();
      setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    }
  };

  return {
    fileNames,
    files,
    fileInputRef,
    onAttachFiles,
    onDeleteFile,
    setFiles,
    onDropFile,
    onPasteFiles: onPaste,
  };
};
