import React from 'react';
import { Skeleton } from '@mui/material';
import { ChatUserMessageSkeleton } from 'entities/chat/ui';
import { skeletons } from '../../config/skeletons';

export const MessageSkeletons = () => {
  return skeletons.map((skeleton, idx) =>
    skeleton === 'user' ? (
      <ChatUserMessageSkeleton key={idx} />
    ) : (
      <Skeleton key={idx} variant="rounded" width="100%" height={120} />
    )
  );
};
