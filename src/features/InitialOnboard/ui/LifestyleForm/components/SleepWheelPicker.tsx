'use client';

import React, { useMemo, useState } from 'react';
import { useWheelPicker } from 'shared/ui/WheelPicker/lib/useWheelPicker';
import { WheelPickerDialog } from 'shared/ui/WheelPicker/WheelPickerDialog';
import { Picker } from 'shared/ui/WheelPicker/Picker';
import { timeWheels } from '../config';

import { Divider, Stack } from '@mui/material';
import Moon from '../assets/moon.svg?component';
import Morning from '../assets/morning.svg?component';
import { UseFormSetValue } from 'react-hook-form';
import { LifestyleSchema } from 'features/InitialOnboard/schemas';
import { WheelItem } from 'shared/ui/WheelPicker/types';

import styles from '../LifestyleForm.module.scss';

interface Props {
  form: any;

  setValue: UseFormSetValue<LifestyleSchema>;
}

export const SleepWheelPicker = ({ form, setValue }: Props) => {
  const [showDialog, setShowDialog] = useState(false);

  const defaultValues = useMemo(
    () => [form.sleep_schedule_down, form.sleep_schedule_wakeUp],
    [form.sleep_schedule_down, form.sleep_schedule_wakeUp]
  );

  const onClose = () => {
    setShowDialog(false);
  };

  const onSubmit = (data: WheelItem[]) => {
    setValue('sleep_schedule_down', data[0].value.toString());
    setValue('sleep_schedule_wakeUp', data[1].value.toString());
  };

  const { selectedIndexes, onSelectItem, handleSubmit, resetSelectedIndexes } =
    useWheelPicker({
      wheels: [timeWheels, timeWheels],
      defaultSelectedValues: defaultValues,
      onSubmit,
      onClose,
    });

  const handleClose = () => {
    onClose();
    resetSelectedIndexes();
  };

  return (
    <>
      <Stack
        direction="row"
        width={'100%'}
        position="relative"
        className={styles.sleep}
        onClick={() => setShowDialog(true)}
      >
        <Stack className={styles.sleepItem} direction="row">
          {/* <Image src={moon} alt="" width={11} height={17} /> */}
          <Moon width={11} height={18} />

          <p>Отход ко сну {form.sleep_schedule_down}</p>
        </Stack>
        <Divider orientation="vertical" flexItem className={styles.divider} />
        <Stack className={styles.sleepItem} direction="row">
          <p>Пробуждение {form.sleep_schedule_wakeUp}</p>

          <Morning width={11} height={18} />
          {/* <Image src={morning} alt="" width={11} height={17} /> */}
        </Stack>
      </Stack>

      {showDialog && (
        <WheelPickerDialog
          open={showDialog}
          onClose={handleClose}
          title="Режим сна"
          onSubmit={handleSubmit}
        >
          <div className={styles.wheels}>
            <div className={styles.wheelItem}>
              <p className={styles.pickerLabel}>Отход ко сну</p>
              <Picker
                options={timeWheels}
                selectedIndex={selectedIndexes[0]}
                onChange={onSelectItem(0)}
              />
            </div>

            <div className={styles.wheelDivider} />

            <div className={styles.wheelItem}>
              <p className={styles.pickerLabel}>Пробуждение</p>
              <Picker
                options={timeWheels}
                selectedIndex={selectedIndexes[1]}
                onChange={onSelectItem(1)}
              />
            </div>
          </div>
        </WheelPickerDialog>
      )}
    </>
  );
};
