'use client';

import InfoSrc from '@/app/assets/images/common/info.svg?component';
import Tooltip from '@mui/material/Tooltip';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react';
import styles from './ResponsiveTooltip.module.scss';
import classNames from 'classnames';

export function ResponsiveTooltip({
  title,
  className,
  right,
}: {
  title: string;
  className?: string;
  right?: boolean;
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <Tooltip
      title={title}
      open={open}
      onClose={handleClose}
      onOpen={isMobile ? undefined : handleOpen}
      leaveTouchDelay={10000}
      placement={right ? 'right' : 'top'}
      arrow
      classes={{
        tooltip: classNames(styles.tooltip, {
          [styles.right]: right,
        }),
      }}
    >
      <span
        onClick={handleClick}
        onMouseEnter={isMobile ? undefined : handleOpen}
        onMouseLeave={isMobile ? undefined : handleClose}
        className={classNames(styles.image, className)}
      >
        <InfoSrc style={{ width: 17, height: 17 }} />
      </span>
    </Tooltip>
  );
}
