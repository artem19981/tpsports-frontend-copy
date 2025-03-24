import React, { memo, PropsWithChildren, ReactNode } from 'react';
import cn from 'classnames';

import { Typography } from '@mui/material';
import { OnboardProgressBar } from 'features/InitialOnboard';
import { InitialOnboardStep } from 'features/InitialOnboard/model';

import styles from './OnboardingLayout.module.scss';

interface Props {
  step: InitialOnboardStep;
  isWomen?: boolean;

  withHeader?: boolean;
  footer?: React.ReactNode;
  content?: React.ReactNode;

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
    footer,
    children,
    title,
    content,
    containerClassName,
    childrenClassName,
    contentClassName,
    headerClassName,
  }: PropsWithChildren<Props>) => {
    return (
      <div className={cn(styles.container, containerClassName)}>
        <div className={styles.leftCircle} />
        <div className={styles.rightCircle} />

        <div className={cn(styles.content, contentClassName)}>
          {content}
          <div className={styles.scrollableBlock}>
            <div className={cn(styles.children, childrenClassName)}>
              {withHeader && (
                <div className={cn(styles.header, headerClassName)}>
                  <OnboardProgressBar step={step} isWomen={isWomen} />

                  {title && (
                    <Typography className={styles.title}>{title}</Typography>
                  )}
                </div>
              )}

              {children}
            </div>

            {footer}
          </div>
        </div>
      </div>
    );
  }
);

OnboardingLayout.displayName = 'OnboardingLayout';
