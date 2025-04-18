'use client';

import React from 'react';

import styles from './BodyMeasurementsHealthForm.module.scss';
import { useMediaQuery } from '@mui/material';
import { BodyMeasurementsPickers } from '../components/BodyMeasurementsPickers';
import { BodyIndex } from '../components/BodyIndex/BodyIndex';
import { WaistCircumferenceField } from '../components/WaistCircumferenceField';
import { useFadeScroll } from 'shared/lib/hooks/useFadeScroll';
import { useLocalForm } from '../lib/useLocalForm';
import { UserProfile } from 'features/User/model';
import { MyHealthFormSubmitButton } from 'entities/onboarding/ui';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import { WithAbsoluteScrollBar } from 'shared/ui';

interface Props {
  userProfile: UserProfile;
  onSuccess: () => void;
}

export const BodyMeasurementsHealthForm = ({ userProfile, onSuccess }: Props) => {
  const ref = useFadeScroll<HTMLDivElement>(1000, 'hide-scroll-opacity');
  const isSmallHeight = useMediaQuery('(max-height: 560px)');

  const { control, isPending, handleSubmit, setValue, onSubmit, form, isDirty } = useLocalForm({
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
      <WithAbsoluteScrollBar>
        <div className={styles.container} ref={ref}>
          <p className={styles.title}>Измерения тела</p>

          <BodyMeasurementsPickers form={form} setValue={setValue} isSmallHeight={isSmallHeight} />

          <BodyIndex form={form} className={styles.bodyIndexContainer} />

          <div className={styles.waistContainer}>
            <WaistCircumferenceField control={control} className={styles.waistContent} />
          </div>
        </div>
      </WithAbsoluteScrollBar>

      <MyHealthFormSubmitButton type="submit" disabled={isPending} visible={isDirty} />
    </form>
  );
};
