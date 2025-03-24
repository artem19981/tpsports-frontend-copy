import React from 'react';

import { BUTTONS_GROUP_SEPARATOR, ButtonsGroup, ToggleButton } from 'shared/ui';
import { strengthTrainingGroup, otherFieldName } from '../config';
import { Divider, Stack, Typography } from '@mui/material';

import styles from '../StrengthTrainingForm.module.scss';

interface Props {
  category: string;
  activeButtons: string;
  otherValue: string;

  onClick(value: string): void;
}

export const StrengthTrainingCategory = ({
  category,
  activeButtons,
  otherValue,
  onClick,
}: Props) => {
  const buttons = strengthTrainingGroup[category];

  if (category === otherFieldName) {
    return (
      <div className={styles.category}>
        <Divider className={styles.categoryName}>{category}</Divider>

        <Stack alignItems="center">
          <ToggleButton
            isActive={!!otherValue}
            value={otherValue}
            onClick={() => onClick(otherFieldName)}
            className={styles.otherButton}
            label={
              <Typography className={styles.otherButtonText}>
                {otherValue || 'Я занимаюсь ...'}
              </Typography>
            }
          />
        </Stack>
      </div>
    );
  }

  return (
    <div className={styles.category}>
      <Divider className={styles.categoryName}>{category}</Divider>

      <ButtonsGroup
        buttons={buttons}
        activeButtons={activeButtons?.split(BUTTONS_GROUP_SEPARATOR) || []}
        onClick={onClick}
        className={styles.buttonsGroup}
      />
    </div>
  );
};
