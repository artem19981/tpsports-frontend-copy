import React, { forwardRef, ReactNode, RefObject, useState } from 'react';
import { WheelPickerDialog } from '../WheelPicker/WheelPickerDialog';
import { DateWheelPickerContent } from './DateWheelPickerContent';
import { Input } from '../Input';
import styles from './DateWheelPicker.module.scss';
import classNames from 'classnames';

interface Props {
  value?: string;

  inputClassName?: string;

  onChange: (value: string) => void;
  renderAfterInput?: (ref: RefObject<HTMLInputElement>) => ReactNode;
}

export const DateWheelPicker = forwardRef<HTMLInputElement, Props>(
  ({ value = '', inputClassName, renderAfterInput, onChange }, ref) => {
    const [showDialog, setShowDialog] = useState(false);

    const onClose = () => {
      setShowDialog(false);
    };

    const [day, month, year] = value.split('.');

    return (
      <>
        <Input
          label="Дата рождения"
          inputWrapperClassName={classNames(
            styles.inputWrapper,
            inputClassName
          )}
          ref={ref}
          value={value}
          onClick={() => setShowDialog(true)}
          readOnly
          renderAfterInput={renderAfterInput}
        />

        <WheelPickerDialog
          open={showDialog}
          onClose={onClose}
          title="Дата рождения"
          footer={null}
        >
          <DateWheelPickerContent
            onClose={onClose}
            onSubmit={onChange}
            defaultDay={day ? +day : undefined}
            defaultMonth={month ? +month : undefined}
            defaultYear={year ? +year : undefined}
          />
        </WheelPickerDialog>
      </>
    );
  }
);

DateWheelPicker.displayName = 'DateWheelPicker';
