import { ChatDto } from 'features/Chat/model';

export const getSortedChatMessages = (messages: ChatDto['messages']) => {
  const copy = structuredClone(messages);

  return copy.sort((a, b) => {
    const ATimestamp =
      a.sender === 'user'
        ? new Date(a.timestamp).getTime() - 1000
        : new Date(a.timestamp).getTime();

    const BTimestamp =
      b.sender === 'user'
        ? new Date(b.timestamp).getTime() - 1000
        : new Date(b.timestamp).getTime();

    return ATimestamp - BTimestamp;
  });
};
