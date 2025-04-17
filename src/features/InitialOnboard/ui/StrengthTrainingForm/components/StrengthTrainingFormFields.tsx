'use client';

import React, { useState } from 'react';

import { BUTTONS_GROUP_SEPARATOR } from 'shared/ui';

import { otherFieldName, allCategories } from '../config';
import { Label } from 'shared/ui/Label';
import { StrengthTrainingCategory } from './StrengthTrainingCategory';

import styles from '../StrengthTrainingForm.module.scss';
import { getCategories } from '../lib/getCategoryByValues';
import { UserProfile } from 'features/User/model';
import { UseFormSetValue } from 'react-hook-form';
import { OnboardingOtherModal } from 'entities/onboarding/ui';

interface Props {
  userProfile: UserProfile;
  favoriteTrainingTypes: string;
  favoriteTrainingTypesOther: string;

  setValue: UseFormSetValue<any>;
}

export const StrengthTrainingFormFields = ({
  userProfile,
  favoriteTrainingTypes,
  favoriteTrainingTypesOther,
  setValue,
}: Props) => {
  const [openedCategories, setOpenedCategories] = useState<string[]>(() =>
    getCategories(favoriteTrainingTypes),
  );

  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = (value: string) => {
    if (value === otherFieldName) {
      setShowModal(true);
      return;
    }

    const valuesArray = favoriteTrainingTypes.split(BUTTONS_GROUP_SEPARATOR).map((v) => v.trim());

    if (valuesArray.includes(value)) {
      const newValues = valuesArray.filter((v) => v !== value);
      setValue('favorite_training_types', newValues.join(BUTTONS_GROUP_SEPARATOR), {
        shouldDirty: true,
      });
    } else {
      setValue(
        'favorite_training_types',
        favoriteTrainingTypes
          ? `${favoriteTrainingTypes}${BUTTONS_GROUP_SEPARATOR}${value}`
          : value,
        { shouldDirty: true },
      );
    }
  };

  const onSubmitOther = (value: string) => {
    setValue('favorite_training_types_other', value, { shouldDirty: true });
    setShowModal(false);
  };

  const onToggleCategory = (value: string) => {
    const activeCategories = getCategories(favoriteTrainingTypes);

    if (openedCategories.includes(value)) {
      setOpenedCategories(openedCategories.filter((v) => v !== value));
    } else {
      setOpenedCategories([value, ...openedCategories.filter((v) => activeCategories.includes(v))]);
    }
  };

  return (
    <>
      <Label className={styles.label}>
        Выберите один или несколько видов спорта, которыми занимаетесь
      </Label>

      <div className={styles.wrapper}>
        {allCategories.map((group) => (
          <StrengthTrainingCategory
            key={group}
            onClick={handleButtonClick}
            category={group}
            activeButtons={favoriteTrainingTypes}
            otherValue={favoriteTrainingTypesOther}
            openedCategories={openedCategories}
            onToggleCategory={onToggleCategory}
          />
        ))}
      </div>

      {showModal && (
        <OnboardingOtherModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={onSubmitOther}
          title="Другие"
          label="Укажите другие виды спорта и физической активности, которыми занимаетесь"
          defaultValue={favoriteTrainingTypesOther || ''}
        />
      )}
    </>
  );
};
