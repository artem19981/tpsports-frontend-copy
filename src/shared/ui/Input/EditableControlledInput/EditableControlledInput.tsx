'use client';

import React, { ReactNode, RefObject } from 'react';

import { Icon, IconButton } from '@mui/material';

import Edit from 'shared/assets/edit.svg?component';
import Checkmark from 'shared/assets/rounded-checkmark.svg?component';
import { genericMemo } from 'shared/model/generic-memo';

import styles from './EditableControlledInput.module.scss';

interface Props {
  isChanged: boolean;
  isFormSubmitted: boolean;

  renderInput(args: any): ReactNode;
}

const EditableControlledInputComponent = ({
  isChanged,
  isFormSubmitted,
  renderInput,
}: Props) => {
  const EditIcon = (ref: RefObject<HTMLInputElement>) => (
    <IconButton
      className={styles.icon}
      onClick={() => {
        ref?.current?.click();
        ref?.current?.focus();
      }}
    >
      <Edit />
    </IconButton>
  );

  const CheckedIcon = () => (
    <Icon className={styles.checkmark}>
      <Checkmark />
    </Icon>
  );

  const renderAfterInput =
    isChanged && isFormSubmitted ? CheckedIcon : EditIcon;

  return (
    <>
      {renderInput({
        renderAfterInput,
        containerClassName: styles.container,
      })}
    </>
  );
};

export const EditableControlledInput = genericMemo(
  EditableControlledInputComponent
);

EditableControlledInput.displayName = 'EditableControlledInput';
