'use client';

import React, { useState } from 'react';

import { BUTTONS_GROUP_SEPARATOR, Swiper } from 'shared/ui';

import {
  otherFieldName,
  strengthTrainingGroup,
  swiperCategories,
} from '../config';
import { Label } from 'shared/ui/Label';
import { SwiperSlide } from 'swiper/react';
import { StrengthTrainingCategory } from './StrengthTrainingCategory';
import { CategoriesSwipe } from './CategoriesSwipe';

import styles from '../StrengthTrainingForm.module.scss';
import { getCategories } from '../lib/getCategoryByValues';
import { UserProfile } from 'features/User/model';
import { UseFormSetValue } from 'react-hook-form';
import { deleteElementsFromArray } from '../lib/deleteElementsFromArray';
import { OnboardingOtherModal } from 'entities/onboarding/ui';

interface Props {
  userProfile: UserProfile;
  favoriteTrainingTypes: string;
  favoriteTrainingTypesOther: string;
  categoriesClassName: string;

  modalClassName?: string;

  setValue: UseFormSetValue<any>;
}

export const StrengthTrainingFormFields = ({
  userProfile,
  favoriteTrainingTypes,
  favoriteTrainingTypesOther,
  categoriesClassName,
  modalClassName,
  setValue,
}: Props) => {
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState(() =>
    getCategories(userProfile)
  );

  const handleButtonClick = (value: string) => {
    if (value === otherFieldName) {
      setShowModal(true);
      return;
    }

    const valuesArray = favoriteTrainingTypes
      .split(BUTTONS_GROUP_SEPARATOR)
      .map((v) => v.trim());

    if (valuesArray.includes(value)) {
      const newValues = valuesArray.filter((v) => v !== value);
      setValue(
        'favorite_training_types',
        newValues.join(BUTTONS_GROUP_SEPARATOR),
        { shouldDirty: true }
      );
    } else {
      setValue(
        'favorite_training_types',
        favoriteTrainingTypes
          ? `${favoriteTrainingTypes}${BUTTONS_GROUP_SEPARATOR}${value}`
          : value,
        { shouldDirty: true }
      );
    }
  };

  const deleteCategory = (value: string) => {
    if (value === otherFieldName) {
      setValue('favorite_training_types_other', '', { shouldDirty: true });
    }

    const newValues = categories.filter((v) => v !== value);
    setCategories(newValues);

    setValue(
      'favorite_training_types',
      deleteElementsFromArray(
        favoriteTrainingTypes.split(BUTTONS_GROUP_SEPARATOR),
        strengthTrainingGroup[value]
      ).join(BUTTONS_GROUP_SEPARATOR),
      { shouldDirty: true }
    );
  };

  const onToggleCategory = (value: string) => {
    if (categories.includes(value)) {
      deleteCategory(value);
    } else {
      setCategories([value, ...categories]);
    }
  };

  const onCategoryClick = (value: string) => {
    if (value === otherFieldName && !categories.includes(otherFieldName)) {
      setShowModal(true);
      return;
    }

    onToggleCategory(value);
  };

  const onSubmitOther = (value: string) => {
    setValue('favorite_training_types_other', value, { shouldDirty: true });
    setShowModal(false);

    if (!value) {
      deleteCategory(otherFieldName);
    } else {
      const isOtherCategoryAlreadyExists = categories.includes(otherFieldName);

      if (!isOtherCategoryAlreadyExists) {
        setCategories([otherFieldName, ...categories]);
      }
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Label className={styles.label}>Виды спорта</Label>

        <Swiper withArrows={false}>
          {swiperCategories.map((group, index) => (
            <SwiperSlide
              key={index}
              style={{ width: 'auto', paddingLeft: 15, cursor: 'pointer' }}
              onClick={() => onCategoryClick(group)}
            >
              <CategoriesSwipe
                isActive={categories.includes(group)}
                value={group}
                onClick={onCategoryClick}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {categories.length > 0 && (
          <Label className={styles.secondLabel}>Тренировки</Label>
        )}

        <div className={categoriesClassName}>
          {categories.map((category) => (
            <StrengthTrainingCategory
              key={category}
              onClick={handleButtonClick}
              category={category}
              activeButtons={favoriteTrainingTypes}
              otherValue={favoriteTrainingTypesOther}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <OnboardingOtherModal
          open={showModal}
          onClose={() => setShowModal(false)}
          onSubmit={onSubmitOther}
          title="Другие"
          label="Опишите виды спорта и физической активности"
          defaultValue={favoriteTrainingTypesOther || ''}
          className={modalClassName}
        />
      )}
    </>
  );
};
