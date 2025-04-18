import React, { ReactNode } from 'react';
import cn from 'classnames';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import styles from './ExpandableCategory.module.scss';

interface Props {
  open: boolean;
  title: string;
  children: React.ReactNode;
  isActive: boolean;

  beforeTitle?: ReactNode;

  onToggle?: (value: string) => void;
  onClick?: () => void;
}

export function ExpandableCategory({
  open,
  title,
  children,
  isActive,
  beforeTitle,
  onToggle,
  onClick,
}: Props) {
  const handleToggle = () => {
    onToggle?.(title);
  };

  return (
    <Accordion
      expanded={open}
      onChange={isActive ? undefined : handleToggle}
      onClick={onClick}
      sx={{
        '&:before': { display: 'none' },
      }}
      className={cn(styles.accordion, {
        [styles.active]: isActive,
      })}
    >
      <AccordionSummary
        className={cn(styles.header, {
          [styles.notExpanded]: !open,
        })}
      >
        {beforeTitle}

        <p className={styles.title}>{title}</p>
      </AccordionSummary>

      <AccordionDetails className={styles.details}>
        <div className={styles.buttonsGroup}>{children}</div>
      </AccordionDetails>
    </Accordion>
  );
}
