import { MenuItem, MenuList } from '@mui/material';
import React, { forwardRef } from 'react';
import Pen from './assets/pen.svg?component';
import Favorite from './assets/favorite.svg?component';
import Export from './assets/export.svg?component';
import NotFavorite from './assets/notFavorite.svg?component';
import Delete from 'app/assets/images/common/delete.svg?component';

import styles from './MultiChatMenuItemOptions.module.scss';
import classNames from 'classnames';
import { useSnackbar } from 'shared/ui';

interface Props {
  assistantColor: string;
  isFavorite: boolean;

  onStartRename: () => void;
  onClose: (isOpen: boolean) => void;
}

export const MultiChatMenuItemOptions = forwardRef<HTMLUListElement, Props>(
  ({ assistantColor, isFavorite, onStartRename, onClose }: Props, ref) => {
    const snackbar = useSnackbar();

    const onToggleFavorite = () => {
      console.log('toggle favorite');

      onClose(false);
    };

    const onRename = () => {
      onStartRename();
      onClose(false);
    };

    const openExportMenu = () => {
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
          {isFavorite ? <Favorite className={styles.icon} /> : <NotFavorite className={styles.largeIcon} />}
          Избранное
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={onRename}>
          <Pen className={styles.icon} />
          Переименовать
        </MenuItem>
        <MenuItem className={styles.menuItem} onClick={openExportMenu}>
          <Export className={styles.icon} />
          Экспорт чата
        </MenuItem>
        <MenuItem className={classNames(styles.menuItem, styles.red)} onClick={onDelete}>
          <Delete className={styles.icon} />
          Удалить
        </MenuItem>
      </MenuList>
    );
  },
);

MultiChatMenuItemOptions.displayName = 'MultiChatMenuItemOptions';
