'use client';

import { KeyboardEventHandler, SyntheticEvent, useMemo, useState } from 'react';

import ArrowIcon from '@/app/assets/images/aiChat/arrow.svg?component';
import ClipIcon from '@/app/assets/images/aiChat/pClip.svg?component';
import {
  INPUT_FILE_ACCEPT,
  UploadedFiles,
  useChatType,
} from 'entities/chat/ui';
import { BOTS } from 'shared/constants/bots';

import styles from './ChatInput.module.scss';
import { IconButton, TextArea, useSnackbar } from 'shared/ui';
import { useLoadingDots } from 'shared/lib';
import classNames from 'classnames';
import { Stack } from '@mui/material';
import { uploadFiles, useUploadFiles } from './lib';
import { SendMessageDto } from 'features/Chat/model';

interface Props {
  isPending: boolean;
  disabled?: boolean;
  rootClassName?: string;
  onSendMessage: (payload: Omit<SendMessageDto, 'bot_name'>) => void;
  setLoading?: (value: boolean) => void;
}

export function ChatInput({
  isPending,
  disabled,
  rootClassName,
  onSendMessage,
  setLoading,
}: Props) {
  const showSnackbar = useSnackbar();
  const [inputValue, setInputValue] = useState('');
  const loadingPlaceholder = useLoadingDots('Отправляем сообщение', isPending);

  const {
    fileInputRef,
    files,
    fileNames,
    setFiles,
    onAttachFiles,
    onDeleteFile,
    onDropFile,
    onPasteFiles,
  } = useUploadFiles();

  const chatType = useChatType()?.chatType;
  const selectedBot = useMemo(
    () => BOTS.find((bot) => bot.name === chatType),
    [chatType]
  );

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (e?: SyntheticEvent) => {
    e?.preventDefault();
    // console.log((!inputValue || inputValue === '\n') && files.length === 0);

    if ((!inputValue || inputValue === '\n') && files.length === 0) {
      return;
    }

    setLoading?.(true);

    const hasFiles = files.length > 0;
    const uploadedFileIds = hasFiles
      ? await uploadFiles(files, showSnackbar)
      : [];

    onSendMessage({
      content: inputValue,
      ...(uploadedFileIds.length > 0 && { files: uploadedFileIds }),
    });
    setInputValue('');
    setFiles([]);
  };

  const onKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    const input = e.target as HTMLTextAreaElement;

    if (e.shiftKey) {
      const start = input.selectionStart;
      const end = input.selectionEnd;
      setInputValue(
        (value) => value.substring(0, start) + '\n' + value.substring(end)
      );

      input.selectionStart = input.selectionEnd = start + 1;
      e.preventDefault();
    } else {
      onSubmit();
    }
  };

  return (
    <div
      className={classNames(styles.container, rootClassName)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDropFile}
    >
      <form className={styles.form} onSubmit={onSubmit}>
        {fileNames.length > 0 && (
          <UploadedFiles fileNames={fileNames} onDeleteFile={onDeleteFile} />
        )}

        <Stack>
          <TextArea
            maxRows={10}
            minRows={2}
            disabled={isPending || disabled}
            value={inputValue === '\n' ? '' : inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
            placeholder={
              isPending ? loadingPlaceholder : 'Написать ИИ ассистенту'
            }
            onKeyDown={onKeyDown}
            onPaste={onPasteFiles}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <IconButton
            onClick={handleImageClick}
            disabled={isPending || disabled}
            className={styles.clip}
          >
            <ClipIcon />
          </IconButton>

          <input
            type="file"
            accept={INPUT_FILE_ACCEPT}
            multiple
            ref={fileInputRef}
            style={{ display: 'none' }}
            disabled={isPending || disabled}
            onChange={onAttachFiles}
          />

          <IconButton
            className={styles.arrow}
            onClick={onSubmit}
            disabled={isPending || disabled}
            style={{ background: selectedBot?.gradient }}
          >
            <ArrowIcon
              style={{ color: selectedBot?.color }}
              width="11"
              height="10"
            />
          </IconButton>
        </Stack>
      </form>
    </div>
  );
}
