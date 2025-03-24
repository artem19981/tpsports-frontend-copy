import { useMutation } from '@tanstack/react-query';
import { sendChatMessage } from 'features/Chat/api';

export const useMessage = () => {
  return useMutation({
    mutationFn: sendChatMessage,
    onSuccess: () => {
      // revalidatePath('/');
    },
    onError: () => {
      //   showSnackbar('Не удалось отправить сообщение', 'error');
    },
  });
};
