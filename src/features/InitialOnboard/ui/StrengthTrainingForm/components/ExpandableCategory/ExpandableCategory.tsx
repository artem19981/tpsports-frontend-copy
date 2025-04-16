import React from 'react';
import cn from 'classnames';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import styles from './ExpandableCategory.module.scss';

interface Props {
  open: boolean;
  onToggle?: (value: string) => void;
  onClick?: () => void;
  title: string;
  children: React.ReactNode;
  isActive: boolean;
}

export function ExpandableCategory({ open, onToggle, onClick, title, children, isActive }: Props) {
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
        <span
          className={cn(styles.itemIndicator, {
            [styles.active]: isActive,
          })}
          style={{
            backgroundColor: '#00FD44',
            ['--glow-color' as any]: '#00FD44',
          }}
        />
        <p className={styles.title}>{title}</p>
      </AccordionSummary>

      <AccordionDetails className={styles.details}>
        <div className={styles.buttonsGroup}>{children}</div>
      </AccordionDetails>
    </Accordion>
  );
}
