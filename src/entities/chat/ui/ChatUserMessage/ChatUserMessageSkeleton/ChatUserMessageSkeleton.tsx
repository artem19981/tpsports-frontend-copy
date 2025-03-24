import { Skeleton, Stack } from '@mui/material';
import React from 'react';

export const ChatUserMessageSkeleton = () => {
  return (
    <Stack alignItems="flex-end">
      <Skeleton variant="rounded" width="70%" height={30} />
    </Stack>
  );
};
