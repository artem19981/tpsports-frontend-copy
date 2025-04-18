'use client';

import React from 'react';

import { formatMeasurement } from 'shared/lib/formatter/formatMeasurement';
import humanSrc from './assets/human.png';
import bodySrc from './assets/body.png';
import Image from 'next/image';
import { isDefined } from 'shared/lib/is-defined';
import { useMediaQuery } from '@mui/material';
import { BodyMeasurementsPickers } from '../components/BodyMeasurementsPickers';
import { BodyIndex } from '../components/BodyIndex/BodyIndex';
import { WaistCircumferenceField } from '../components/WaistCircumferenceField';

import styles from './BodyMeasurementsInitialOnboardingForm.module.scss';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { Button, Loader } from 'shared/ui';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const BodyMeasurementsInitialOnboardingForm = ({ onSuccess, userProfile }: Props) => {
  const isSmallHeight = useMediaQuery('(max-height: 560px)');

  const { control, isPending, handleSubmit, setValue, onSubmit, form } = useLocalForm({
    userProfile,
    onSuccess,
  });

  return (
    <form
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        overflow: 'auto',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <BodyMeasurementsPickers form={form} setValue={setValue} isSmallHeight={isSmallHeight} />

      <div className={styles.bodyIndexContainer}>
        <BodyIndex form={form} />

        <div className={styles.humanContainer}>
          <Image className={styles.human} src={humanSrc} width={92} height={285} alt="human" />

          <p className={styles.humanText}>ИМТ</p>
        </div>
      </div>

      <div className={styles.waistContainer}>
        <WaistCircumferenceField control={control} className={styles.bodyLeftContainer} />
        <div className={styles.bodyContainer}>
          <Image className={styles.body} src={bodySrc} width={170} height={303} alt="body" />

          <div className={styles.ellipse}>
            {isDefined(form.waist_circumference)
              ? formatMeasurement(form.waist_circumference, 'см')
              : '-'}
          </div>
        </div>
      </div>

      <Button type="submit" style={{ marginTop: 60 }} disabled={isPending}>
        Далее
      </Button>

      {isPending && <Loader />}
    </form>
  );
};
