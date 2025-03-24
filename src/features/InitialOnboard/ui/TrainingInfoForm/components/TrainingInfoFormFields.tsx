'use client';

import React from 'react';

import { BUTTONS_GROUP_SEPARATOR, ButtonsGroup, TextArea } from 'shared/ui';

import styles from '../TrainingInfoForm.module.scss';
import { Divider } from '@mui/material';
import { equipmentButtons, locationButtons } from '../config';
import { Path } from 'react-hook-form';

interface Props {
  form: any;
  handleButtonClick: (
    value: string,
    selectedValues: string | undefined,
    fieldName: Path<any>
  ) => void;
  register: any;
}

export const TrainingInfoFormFields = ({
  form,
  handleButtonClick,
  register,
}: Props) => {
  return (
    <>
      <div className={styles.wrapper}>
        <p className={styles.label}>Где вы планируете тренироваться</p>

        <ButtonsGroup
          className={styles.buttons}
          buttons={locationButtons}
          activeButtons={
            form.training_location?.split(BUTTONS_GROUP_SEPARATOR) || []
          }
          onClick={(value) =>
            handleButtonClick(
              value,
              form.training_location,
              'training_location'
            )
          }
        />
      </div>
      <Divider className={styles.divider} />

      <div className={styles.wrapper}>
        <p className={styles.label}>К какому инвентарю у вас есть доступ</p>

        <ButtonsGroup
          className={styles.buttons}
          buttons={equipmentButtons}
          activeButtons={form.equipment?.split(BUTTONS_GROUP_SEPARATOR) || []}
          onClick={(value) =>
            handleButtonClick(value, form.equipment, 'equipment')
          }
        />
      </div>

      <Divider className={styles.divider} />

      <div className={styles.wrapper}>
        <p className={styles.label}>
          Ограничения в физической активности или травмы
        </p>

        <TextArea
          {...register('injuries_or_restrictions')}
          className={styles.textarea}
          placeholder="Сведения о ваших ограничениях или травмах помогут ИИ адаптировать рекомендации, для лучшей поддержки ваших целей."
        />
      </div>
    </>
  );
};
