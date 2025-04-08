import { ClickAwayListener, Grow, IconButton, Paper, Popper, useMediaQuery } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import Dots from './assets/dots.svg?component';
import styles from './ChatOptionsMenu.module.scss';
import classNames from 'classnames';

interface Props {
  id: number;
  color: string;
  isChatPressed: React.MutableRefObject<boolean>;
  visibleOnMobile: boolean;

  open: boolean;
  onOpenMenu: React.Dispatch<React.SetStateAction<number | null>>;

  renderChildren: () => JSX.Element;
}

export const ChatOptionsMenu = ({
  id,
  color,
  isChatPressed,
  open,
  visibleOnMobile,
  onOpenMenu,
  renderChildren,
}: Props) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setTimeout(() => {
      onOpenMenu((prevId) => (prevId === id ? null : id));
    });
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) ||
      isChatPressed.current
    ) {
      return;
    }

    onOpenMenu(null);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef?.current?.focus?.();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleToggle}
        style={{ color }}
        size="small"
        className={classNames(styles.icon, {
          [styles.hidden]: !visibleOnMobile,
        })}
      >
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
              <ClickAwayListener onClickAway={handleClose}>{renderChildren()}</ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};
