'use client';

import React, { useEffect, useRef, useState } from 'react';
import { WheelItem } from 'shared/ui/WheelPicker/types';
import { useWheelPicker } from 'shared/ui/WheelPicker/lib/useWheelPicker';
import { WheelPickerDialog } from 'shared/ui/WheelPicker/WheelPickerDialog';
import { Picker } from 'shared/ui/WheelPicker/Picker';
import { Input, ToggleButtons } from 'shared/ui';
import { View } from './types';
import { formatNumber } from 'shared/lib/formatter/formatNumber';
import { getIsSteps } from '../lib/getIsSteps';
import { useMediaQuery } from '@mui/material';

import localStyles from './StepsWheelPicker.module.scss';
import { kilometersWheels, metresWheels, toggleButtons } from './config';

interface Props {
  defaultSelectedValues: string[];
  inputValue: number;
  className?: string;
  onSubmit: (data: WheelItem[]) => void;
}

export const StepsWheelPicker = ({
  defaultSelectedValues,
  inputValue,
  className,
  onSubmit,
}: Props) => {
  const isSmallHeight = useMediaQuery('(max-height: 570px)');

  const [view, setView] = useState<View>(View.Kilometers);
  const [selectedIndexImMetres, setSelectedIndexInMetres] = useState(0);
  const [selectedIndexImKilometres, setSelectedIndexImKilometres] = useState(0);

  const viewRef = useRef<View>(view);

  const [showDialog, setShowDialog] = useState(false);

  const showKilometers = view === View.Kilometers;

  const wheels = showKilometers ? [kilometersWheels] : [metresWheels];

  const handleChangeView = (view: View) => {
    setView(view);
    viewRef.current = view;
  };

  const onClose = () => {
    setShowDialog(false);
  };

  const { selectedIndexes, onSelectItem, handleSubmit, resetSelectedIndexes } = useWheelPicker({
    wheels,
    defaultSelectedValues,
    onSubmit,
    onClose,
  });

  useEffect(() => {
    const isSteps = getIsSteps(inputValue);
    handleChangeView(isSteps ? View.Metres : View.Kilometers);

    queueMicrotask(resetSelectedIndexes);
  }, [showDialog]);

  const handleClose = () => {
    onClose();
    resetSelectedIndexes();
  };

  const onChangeView = (view: View) => {
    handleChangeView(view);

    if (view === View.Metres) {
      onSelectItem(0)(selectedIndexImMetres);
    } else {
      onSelectItem(0)(selectedIndexImKilometres);
    }
  };

  const handleSelectItem = (idx: number) => {
    onSelectItem(0)(idx);

    if (viewRef.current === View.Metres) {
      setSelectedIndexInMetres(idx);
    } else {
      setSelectedIndexImKilometres(idx);
    }
  };

  return (
    <>
      <Input
        onClick={() => setShowDialog(true)}
        className={localStyles.stepsInput}
        value={formatNumber(inputValue, ' ')}
        readOnly
      />

      {showDialog && (
        <WheelPickerDialog
          open={showDialog}
          onClose={handleClose}
          title="Средняя дистанция, которую вы преодолеваете за день"
          onSubmit={handleSubmit}
          className={localStyles.dialog}
        >
          <div className={localStyles.toggleButtonsContainer}>
            <ToggleButtons
              className={localStyles.toggleButtons}
              buttons={toggleButtons}
              onChange={onChangeView}
              value={view}
            />
          </div>

          <div className={localStyles.wheels}>
            <Picker
              options={wheels[0]}
              selectedIndex={selectedIndexes[0]}
              onChange={handleSelectItem}
              visibleItems={isSmallHeight ? 5 : 7}
              postfix={showKilometers ? 'км' : 'шагов'}
              containerClassName={showKilometers ? '' : localStyles.picker}
            />
          </div>
        </WheelPickerDialog>
      )}
    </>
  );
};
