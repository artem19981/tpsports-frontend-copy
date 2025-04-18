import React from 'react';

import {
  BUTTONS_GROUP_SEPARATOR,
  ButtonsGroup,
  ExpandableCategory,
  PulsingCircle,
} from 'shared/ui';
import cn from 'classnames';

import styles from '../SportGoalForm.module.scss';
import { settingsByCategory, sportGoalsGroup } from '../config';

interface Props {
  category: string;
  activeButtons: string;
  openedCategories: string[];
  onToggleCategory: (value: string) => void;

  onClick(value: string): void;
}

export const SportGoalCategory = ({
  category,
  activeButtons,
  openedCategories,
  onToggleCategory,
  onClick,
}: Props) => {
  const buttons = sportGoalsGroup[category];
  const activeButtonsArray = activeButtons?.split(BUTTONS_GROUP_SEPARATOR) || [];
  const {
    color: pulseColor,
    buttonsClassName,
    activeButtonClassName,
  } = settingsByCategory[category];

  const hasActiveButtons = activeButtonsArray.some((item) =>
    sportGoalsGroup[category].includes(item),
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
          color={pulseColor}
          className={cn(styles.pulse, { [styles.active]: hasActiveButtons })}
        />
      }
    >
      <ButtonsGroup
        buttons={buttons}
        activeButtons={activeButtonsArray}
        onClick={onClick}
        className={styles.buttonsGroup}
        activeClassName={activeButtonClassName}
        buttonClassName={buttonsClassName}
      />
    </ExpandableCategory>
  );
};
