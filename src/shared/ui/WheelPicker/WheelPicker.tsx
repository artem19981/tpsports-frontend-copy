'use client';

import React, { ReactNode, useState } from 'react';
import styles from './WheelPicker.module.scss';
import { Picker } from './Picker';
import { WheelPickerDialog } from './WheelPickerDialog';
import { WheelItem } from './types';
import { useWheelPicker } from './lib/useWheelPicker';

interface Props {
  title: string;
  wheels: WheelItem[][];
  headers?: string[];
  defaultSelectedValues: string[];
  visibleItems?: number;
  pickerItemClassName?: string;
  pickerItemHeight?: number;
  postfix?: string;

  dialogClassName?: string;

  renderContainer(props: { onClick: () => void }): ReactNode;
  onSubmit: (data: WheelItem[]) => void;
}

export const WheelPicker = ({
  title,
  wheels,
  headers,
  defaultSelectedValues,
  visibleItems,
  pickerItemClassName,
  pickerItemHeight,
  postfix,
  dialogClassName,
  renderContainer,
  onSubmit,
}: Props) => {
  const [showDialog, setShowDialog] = useState(false);

  const onClose = () => {
    setShowDialog(false);
  };

  const { selectedIndexes, onSelectItem, handleSubmit, resetSelectedIndexes } =
    useWheelPicker({
      wheels,
      defaultSelectedValues,
      onSubmit,
      onClose,
    });

  const handleClose = () => {
    onClose();
    resetSelectedIndexes();
  };

  return (
    <>
      {renderContainer({ onClick: () => setShowDialog(true) })}

      {showDialog && (
        <WheelPickerDialog
          open={showDialog}
          onClose={handleClose}
          title={title}
          onSubmit={handleSubmit}
          className={dialogClassName}
        >
          <div className={styles.wheels}>
            {wheels.map((wheel, idx) => (
              <Picker
                key={idx}
                options={wheel}
                header={headers?.[idx]}
                selectedIndex={selectedIndexes[idx]}
                onChange={onSelectItem(idx)}
                visibleItems={visibleItems}
                pickerItemClassName={pickerItemClassName}
                itemHeight={pickerItemHeight}
                postfix={postfix}
              />
            ))}
          </div>
        </WheelPickerDialog>
      )}
    </>
  );
};
