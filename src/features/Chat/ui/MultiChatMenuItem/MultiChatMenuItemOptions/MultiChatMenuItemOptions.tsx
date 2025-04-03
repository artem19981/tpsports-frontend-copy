import { Collapse, MenuItem, MenuList } from '@mui/material';
import React, { forwardRef, useState } from 'react';
import Pen from './assets/pen.svg?component';
import Favorite from './assets/favorite.svg?component';
import Export from './assets/export.svg?component';
import NotFavorite from './assets/notFavorite.svg?component';
import Delete from 'app/assets/images/common/delete.svg?component';
import Chevron from 'app/assets/images/common/chevron.svg?component';

import styles from './MultiChatMenuItemOptions.module.scss';
import classNames from 'classnames';
import { useSnackbar } from 'shared/ui';

interface Props {
  isFavorite: boolean;

  onStartRename: () => void;
  onClose: (isOpen: boolean) => void;
}

export const MultiChatMenuItemOptions = forwardRef<HTMLUListElement, Props>(
  ({ isFavorite, onStartRename, onClose }: Props, ref) => {
    const snackbar = useSnackbar();

    const [open, setOpen] = useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    const onToggleFavorite = () => {
      console.log('toggle favorite');

      onClose(false);
    };

    const onRename = () => {
      onStartRename();
      onClose(false);
    };

    const exportCsv = () => {
      console.log('openExportMenu');

      // onClose(false);
    };

    const exportPdf = () => {
      console.log('openExportMenu');

      // onClose(false);
    };

    const onDelete = () => {
      console.log('onDelete');

      // onClose(false);
    };

    return (
      <MenuList ref={ref} className={styles.menu}>
        <MenuItem
          className={classNames(styles.menuItem, styles.green, {
            [styles.largeMenuItem]: !isFavorite,
          })}
          onClick={onToggleFavorite}
        >
          {isFavorite ? (
            <Favorite className={styles.icon} />
          ) : (
            <NotFavorite className={styles.largeIcon} />
          )}
          Избранное
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={onRename}>
          <Pen className={styles.icon} />
          Переименовать
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={handleClick}>
          <Export className={styles.icon} />
          Экспорт чата
          <Chevron className={classNames(styles.chevron, { [styles.open]: open })} />
        </MenuItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <MenuItem className={classNames(styles.menuItem, styles.nestedMenu)} onClick={exportCsv}>
            <p className={styles.nestedMenuItemText}> Экспорт </p>
            <span className={classNames(styles.badge, styles.csv)}>CSV</span>
          </MenuItem>
          <MenuItem className={classNames(styles.menuItem, styles.nestedMenu)} onClick={exportPdf}>
            <p className={styles.nestedMenuItemText}> Экспорт</p>
            <span className={classNames(styles.badge, styles.pdf)}>PDF</span>
          </MenuItem>
        </Collapse>

        <MenuItem className={classNames(styles.menuItem, styles.red)} onClick={onDelete}>
          <Delete className={styles.icon} />
          Удалить
        </MenuItem>
      </MenuList>
    );
  },
);

MultiChatMenuItemOptions.displayName = 'MultiChatMenuItemOptions';
