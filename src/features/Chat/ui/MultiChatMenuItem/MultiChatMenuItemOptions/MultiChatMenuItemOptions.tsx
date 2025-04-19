'use client';

import { Collapse, MenuItem, MenuList } from '@mui/material';
import Chevron from 'app/assets/images/common/chevron.svg?component';
import Delete from 'app/assets/images/common/delete.svg?component';
import classNames from 'classnames';
import { useToggleArchiveForChat } from 'features/Chat/lib/useToggleArchiveForChat';
import { useToggleFavoriteForChat } from 'features/Chat/lib/useToggleFavoriteForChat';
import { forwardRef, useState } from 'react';
import Export from './assets/export.svg?component';
import Favorite from './assets/favorite.svg?component';
import NotFavorite from './assets/notFavorite.svg?component';
import Pen from './assets/pen.svg?component';

import { useSetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import { usePathname } from 'next/navigation';
import styles from './MultiChatMenuItemOptions.module.scss';

interface Props {
  chatId: number;
  isFavorite: boolean;
  isActive: boolean;

  onStartRename: () => void;
  onClose: (isOpen: boolean) => void;
}

export const MultiChatMenuItemOptions = forwardRef<HTMLUListElement, Props>(
  ({ chatId, isFavorite, isActive, onStartRename, onClose }: Props, ref) => {
    const pathname = usePathname();

    const [open, setOpen] = useState(false);

    const toggleFavorite = useToggleFavoriteForChat();
    const toggleArchive = useToggleArchiveForChat();
    const setActiveChatId = useSetActiveChatId();

    const handleClick = () => {
      setOpen(!open);
    };

    const onToggleFavorite = () => {
      toggleFavorite.mutate(chatId);
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
      if (isActive) {
        setActiveChatId(null);

        const url = new URL(pathname, window.location.origin);
        window.history.replaceState({}, document.title, url.toString());
      }

      toggleArchive.mutate(chatId);
      onClose(false);
    };

    return (
      <MenuList ref={ref} className={styles.menu} onClick={(e) => e.stopPropagation()}>
        <MenuItem
          className={classNames(styles.menuItem, styles.green, {
            [styles.largeMenuItem]: !isFavorite,
          })}
          onClick={onToggleFavorite}
        >
          {isFavorite ? (
            <NotFavorite className={styles.largeIcon} />
          ) : (
            <Favorite className={styles.icon} />
          )}

          {isFavorite ? 'Удалить из избранного' : 'Избранное'}
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
