import React from 'react';

import {
  BUTTONS_GROUP_SEPARATOR,
  ButtonsGroup,
  ExpandableCategory,
  PulsingCircle,
} from 'shared/ui';
import { strengthTrainingGroup, otherFieldName } from '../config';
import cn from 'classnames';

import styles from '../StrengthTrainingForm.module.scss';

interface Props {
  category: string;
  activeButtons: string;
  otherValue: string;
  openedCategories: string[];
  onToggleCategory: (value: string) => void;

  onClick(value: string): void;
}

export const StrengthTrainingCategory = ({
  category,
  activeButtons,
  otherValue,
  openedCategories,
  onToggleCategory,
  onClick,
}: Props) => {
  const buttons = strengthTrainingGroup[category];
  const activeButtonsArray = activeButtons?.split(BUTTONS_GROUP_SEPARATOR) || [];

  if (category === otherFieldName) {
    return (
      <div className={styles.category}>
        <ExpandableCategory
          open={openedCategories.includes(category)}
          onClick={() => onClick(otherFieldName)}
          title={category}
          isActive={!!otherValue}
          beforeTitle={
            <PulsingCircle
              size={10}
              className={cn(styles.pulse, { [styles.active]: !!otherValue })}
            />
          }
        >
          <></>
        </ExpandableCategory>
      </div>
    );
  }

  const hasActiveButtons = activeButtonsArray.some((item) =>
    strengthTrainingGroup[category].includes(item),
  );

  return (
    <ExpandableCategory
      open={openedCategories.includes(category)}
      onToggle={onToggleCategory}
      title={category}
      isActive={hasActiveButtons}
      beforeTitle={
        <PulsingCircle
          size={10}
          className={cn(styles.pulse, { [styles.active]: hasActiveButtons })}
        />
      }
    >
      <ButtonsGroup
        buttons={buttons}
        activeButtons={activeButtonsArray}
        onClick={onClick}
        className={styles.buttonsGroup}
      />
    </ExpandableCategory>
  );
};
