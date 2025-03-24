import React, { ReactNode } from 'react';
import { Stack } from '@mui/material';
import { ToggleButton } from './ToggleButton';

interface Props {
  buttons: string[];
  activeButtons: string[];
  children?: ReactNode;
  className?: string;

  onClick: (value: string) => void;
}

export const ButtonsGroup = ({
  buttons,
  activeButtons,
  className,
  children,
  onClick,
}: Props) => {
  return (
    <Stack
      direction={'row'}
      gap={1}
      justifyContent={'flex-start'}
      flexWrap={'wrap'}
      className={className}
    >
      {buttons.map((value) => (
        <ToggleButton
          key={value}
          isActive={activeButtons.includes(value)}
          value={value}
          onClick={onClick}
        />
      ))}

      {children}
    </Stack>
  );
};
