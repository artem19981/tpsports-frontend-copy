import React, { memo, PropsWithChildren, ReactNode } from 'react';
import cn from 'classnames';

import { Typography } from '@mui/material';
import { OnboardProgressBar } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';

import styles from './OnboardingLayout.module.scss';
import { BlurCirclesBackground } from 'shared/ui';

interface Props {
  step: InitialOnboardStep;
  isWomen?: boolean;

  withHeader?: boolean;

  title?: ReactNode;
  containerClassName?: string;
  childrenClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
}

export const OnboardingLayout = memo(
  ({
    step,
    isWomen,
    withHeader = true,
    children,
    title,
    containerClassName,
    childrenClassName,
    contentClassName,
    headerClassName,
  }: PropsWithChildren<Props>) => {
    return (
      <div className={cn(styles.container, containerClassName)}>
        <div className={cn(styles.content, contentClassName)}>
          <BlurCirclesBackground color={'rgba(5, 239, 182, 0.4)'} />

          <div className={cn(styles.children, childrenClassName)} id="children">
            {withHeader && (
              <div className={cn(styles.header, headerClassName)}>
                <OnboardProgressBar step={step} isWomen={isWomen} />

                {title && <Typography className={styles.title}>{title}</Typography>}
              </div>
            )}

            {children}
          </div>
        </div>
      </div>
    );
  },
);

OnboardingLayout.displayName = 'OnboardingLayout';
