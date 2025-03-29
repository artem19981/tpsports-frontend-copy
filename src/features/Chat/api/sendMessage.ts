import { SendMessageDto } from '../model';

export const sendChatMessage = async (payload: SendMessageDto) => {
  const startTime = performance.now();

  const response = await fetch('/api/assistant', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const endTime = performance.now();
  console.log(
    `Время начала стриминга: ${(endTime - startTime).toFixed(2)} мс`,
    'таймстемп',
    new Date().valueOf()
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const reader = response.body?.getReader();
  const decoder = new TextDecoder();

  return {
    reader,
    decoder,
  };
};
