'use client';

import React, { useLayoutEffect, useMemo, useState } from 'react';

import { useMediaQuery } from '@mui/material';

import styles from './MyHealth.module.scss';
import { FullScreenDialog, MainPageModal } from 'shared/ui';
import {
  MyHealthCategory,
  MyHealthUserBlock,
  OnboardingCategoriesList,
} from 'entities/onboarding/ui';
import { useGetUserProfile } from 'features/User/lib';
import { CategoryState } from '../types';
import { MyHealthActiveForm } from './MyHealthActiveForm/MyHealthActiveForm';
import { getActiveCategoryIcon } from './MyHealthActiveForm/lib/getActiveCategoryIcon';
import { Gender } from 'entities/user/model';

interface Props {
  open?: boolean;
  onClose(): void;
}

export const MyHealth = ({ open, onClose }: Props) => {
  const isMobile = useMediaQuery('(max-width: 650px)');
  const isTablet = useMediaQuery('(max-width: 950px)');
  const [activeCategory, setActiveCategory] = useState<CategoryState>(
    isMobile ? undefined : MyHealthCategory.BodyMeasurements,
  );

  useLayoutEffect(() => {
    if (open) {
      setActiveCategory(isMobile ? undefined : MyHealthCategory.BodyMeasurements);
    }
  }, [open, isMobile]);

  const { data } = useGetUserProfile();

  const isMan = data?.gender === Gender.Male;

  const activeCategoryIcon = useMemo(
    () => getActiveCategoryIcon(isMan, activeCategory),
    [isMan, activeCategory],
  );

  return (
    <MainPageModal onClose={onClose} open={open}>
      <div className={styles.container}>
        <div className={styles.categories}>
          <MyHealthUserBlock
            first_name={data?.first_name}
            last_name={data?.last_name}
            email={data?.email!}
          />
          <OnboardingCategoriesList
            isMan={isMan}
            onClick={setActiveCategory}
            activeCategory={activeCategory}
          />
        </div>

        {isMobile ? (
          <FullScreenDialog
            open={!!activeCategory}
            className={styles.fullScreenDialog}
            onClose={() => setActiveCategory(undefined)}
          >
            <MyHealthActiveForm activeCategory={activeCategory} userProfile={data!} />
          </FullScreenDialog>
        ) : (
          <MyHealthActiveForm activeCategory={activeCategory} userProfile={data!} />
        )}

        {!isTablet && <div className={styles.emptyBlock}>{activeCategoryIcon}</div>}
      </div>
    </MainPageModal>
  );
};
