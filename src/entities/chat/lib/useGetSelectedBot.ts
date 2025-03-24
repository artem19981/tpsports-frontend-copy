import { ChatVariant } from 'features/Chat/model';
import { useMemo } from 'react';
import { BOTS } from 'shared/constants/bots';

export const useGetSelectedBot = (chatVariant: ChatVariant | undefined) => {
  return useMemo(() => BOTS.find((bot) => bot.name === chatVariant), []);
};
