import React, { memo } from 'react';
import { Stack } from '@mui/material';

import { ChatFile } from 'entities/chat/ui';

interface Props {
  fileNames: string[];

  fileClassName?: string;
  containerClassName?: string;
  onDeleteFile?: (idx: number) => void;
}

export const UploadedFiles = memo(
  ({ fileNames, fileClassName, containerClassName, onDeleteFile }: Props) => {
    const fileData = fileNames.map((fileName) => {
      const fileExtension = fileName.split('.')?.pop()?.toLowerCase();

      return {
        name: fileName,
        extension: fileExtension,
      };
    });
    return (
      <Stack
        className={containerClassName}
        direction="row"
        gap={4}
        flexWrap="wrap"
        mb={2}
        ml={1.25}
      >
        {fileData.map(({ name, extension }, idx) => (
          <ChatFile
            key={idx}
            name={name}
            extension={extension}
            onClick={onDeleteFile ? () => onDeleteFile(idx) : undefined}
            className={fileClassName}
          />
        ))}
      </Stack>
    );
  }
);

UploadedFiles.displayName = 'UploadedFiles';
