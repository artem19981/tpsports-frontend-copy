'use client';

import React from 'react';
import styles from './Label.module.scss';
import classNames from 'classnames';

import { ResponsiveTooltip } from '../ResponsiveTooltip';

export const Label = ({ asLabel, tooltip, ...props }: any) => {
  if (asLabel) {
    return (
      <section
        className={classNames(styles.container, props.className, {
          [styles.withTooltip]: tooltip,
        })}
      >
        <label
          {...props}
          className={classNames(styles.label, props.labelClassName)}
        >
          {props.children}
          {tooltip && (
            <ResponsiveTooltip title={tooltip} className={styles.tooltip} />
          )}
        </label>
      </section>
    );
  }

  return (
    <section
      className={classNames(styles.container, props.className, {
        [styles.withTooltip]: tooltip,
      })}
    >
      <p {...props} className={classNames(styles.label, props.labelClassName)}>
        {props.children}
        {tooltip && (
          <ResponsiveTooltip title={tooltip} className={styles.tooltip} />
        )}
      </p>
    </section>
  );
};
