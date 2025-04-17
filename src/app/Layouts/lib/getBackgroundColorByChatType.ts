import { ChatType } from 'entities/chat/model/ChatType';

export const getBackgroundColorByChatType = (type?: ChatType) => {
  if (type === ChatType.Trainer) {
    return {
      left: 'radial-gradient(50% 50% at 50% 50%, rgba(222, 191, 8, 0.2) 0%, #121212 100%)',
      right: 'radial-gradient(50% 50% at 50% 50%, rgba(216, 191, 8, 0.08) 0%, #121212 100%)',
      animate: 'rgb(174, 189, 12, 0.25)',
    };
  }

  if (type === ChatType.Doctor) {
    return {
      left: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.14) 0%, #121212 100%)',
      right: 'radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.06) 0%, #121212 100%)',
      animate: 'rgb(255, 249, 247, 0.2)',
    };
  }

  if (type === ChatType.Nutritionolog) {
    return {
      left: 'radial-gradient(50% 50% at 50% 50%, rgba(38, 67, 108, 0.2) 0%, #121212 100%)',
      right: 'radial-gradient(50% 50% at 50% 50%, rgba(35, 64, 106, 0.1) 0%, #121212 100%)',
      animate: ['rgb(1, 115, 255, 0.4)', 'rgba(1, 192, 229, 0.4)'],
    };
  }

  if (type === ChatType.Psychologist) {
    return {
      left: 'radial-gradient(50% 50% at 50% 50%, rgba(245, 75, 0, 0.2) 0%, #121212 100%)',
      right: 'radial-gradient(50% 50% at 50% 50%, rgba(245, 75, 0, 0.1) 0%, #121212 100%)',
      animate: 'rgba(180, 92, 14, 0.35)',
    };
  }
};
