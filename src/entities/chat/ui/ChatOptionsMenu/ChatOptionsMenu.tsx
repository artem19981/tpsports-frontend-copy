import { ClickAwayListener, Grow, IconButton, Paper, Popper } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Dots from './assets/dots.svg?component';
import styles from './ChatOptionsMenu.module.scss';

interface Props {
  renderChildren: (onClose: (isOpen: boolean) => void) => JSX.Element;
  color: string;
}

export const ChatOptionsMenu = ({ renderChildren, color }: Props) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      console.log('click inside');

      return;
    }

    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef?.current?.focus?.();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton ref={anchorRef} onClick={handleToggle} style={{ color }} size="small" className={styles.icon}>
        <Dots />
      </IconButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        transition
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [10, 10],
            },
          },
        ]}
        className={styles.popper}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper className={styles.paper}>
              <ClickAwayListener onClickAway={handleClose}>{renderChildren(setOpen)}</ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
