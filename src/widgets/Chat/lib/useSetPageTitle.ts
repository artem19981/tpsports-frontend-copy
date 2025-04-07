import { ChatVariant } from 'features/Chat/model';
import { useEffect } from 'react';

const nameByChatVariant: Record<ChatVariant, string> = {
  coach: 'Coach',
  medic: 'Sports Doctor',
  psychologist: 'Sports Psychologist',
  nutritionolog: 'Sports Nutritionist',
};

export const useSetPageTitle = (chatVariant: ChatVariant) => {
  useEffect(() => {
    if (!chatVariant) return;

    document.title = 'AI ' + nameByChatVariant[chatVariant];
  }, [chatVariant]);
};
