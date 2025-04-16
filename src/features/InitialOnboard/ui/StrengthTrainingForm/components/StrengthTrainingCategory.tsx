import React from 'react';

import { BUTTONS_GROUP_SEPARATOR, ButtonsGroup } from 'shared/ui';
import { strengthTrainingGroup, otherFieldName } from '../config';

import styles from '../StrengthTrainingForm.module.scss';
import { ExpandableCategory } from './ExpandableCategory/ExpandableCategory';

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
