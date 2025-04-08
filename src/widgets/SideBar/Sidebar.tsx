'use client';

import ChevronDown from '@/app/assets/images/aiChat/arrow-down.svg?component';
import Burger from '@/app/assets/images/aiChat/burger.svg?component';
import Settings from '@/app/assets/images/aiChat/settings.svg?component';
import Side from '@/app/assets/images/aiChat/side.svg?component';
import Tp from '@/app/assets/images/aiChat/tp.svg?component';
import cn from 'classnames';
import { useChatType } from 'entities/chat/ui';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { BOTS } from 'shared/constants/bots';

import { useMediaQuery } from '@mui/material';
import { useGetActiveChatId } from 'features/Chat/lib/useActiveChatId';
import { useGetMultiChats } from 'features/Chat/lib/useGetMultiChats';
import { FrontendMultiChat } from 'features/Chat/model';
import { MultiChatMenuItem } from 'features/Chat/ui';
import { MyHealth, useMyHealthModal } from 'widgets/MyHealth';
import { UserSettings, useSettingsModal } from 'widgets/UserSettings';
import styles from './Sidebar.module.scss';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const isMobile = useMediaQuery('(max-width: 490px)');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const [showHealth, setShowHealth] = useMyHealthModal();
  const [showSettings, setShowSettings] = useSettingsModal();
  const [openedMenuId, setOpenedMenuId] = useState<number | null>(null);

  const { chatType } = useChatType() || {};
  const currentBot = useMemo(() => BOTS.find((bot) => bot.name === chatType), [chatType]);
  const accentColor = currentBot?.borderColor || '#00ffb0';

  const [expandedSections, setExpandedSections] = useState({
    favorites: true,
    chats: true,
  });

  const { data: chatsData } = useGetMultiChats();
  const activeChatId = useGetActiveChatId();

  const chatData = chatsData?.chats as FrontendMultiChat;

  const toggleSection = (section: 'favorites' | 'chats') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useEffect(() => {
    const child = document.getElementById('children');

    if (!isMobileOpen && child) {
      setIsMobileOpen(false);
      child.style.opacity = '1';
      child.style.transition = 'opacity 0.3s ease ';
    }
    if (child && isMobileOpen) {
      child.style.opacity = '0';
    }
  }, [isMobileOpen, handleMobileToggle]);

  const mobileBackdrop = isMobile && isMobileOpen && (
    <div className={styles.backdrop} onClick={handleMobileToggle} />
  );

  return (
    <>
      {mobileBackdrop}

      <aside
        className={cn(
          styles.sidebar,
          {
            [styles.closed]: !isMobile && !isOpen,
          },
          {
            [styles.mobileOpen]: isMobile && isMobileOpen,
          },
        )}
      >
        <div className={styles.topSection}>
          {!isMobile && isOpen ? (
            <div className={styles.side_main}>
              <div
                className={styles.side_link}
                onClick={() => {
                  setShowHealth(true);
                }}
              >
                <Tp className={styles.icon} />
                <span className={styles.link_text}>Моё Здоровье</span>
              </div>
              <div
                className={styles.side_link}
                onClick={() => {
                  setShowSettings(true);
                }}
              >
                <Settings className={styles.icon} />
                <span className={styles.link_text}>Аккаунт TPS</span>
              </div>
            </div>
          ) : null}

          {!isMobile && !isOpen ? (
            <div className={styles.side_main_collapsed}>
              <div className={styles.side_link}>
                <Tp className={styles.icon} onClick={() => setShowHealth(true)} />
              </div>
              <div className={styles.side_link}>
                <Settings className={styles.icon} onClick={() => setShowSettings(true)} />
              </div>
            </div>
          ) : null}

          {!isMobile && (
            <button
              className={styles.toggleBtn}
              style={{ top: isOpen ? 50 : 20 }}
              onClick={onToggle}
            >
              <Side />
            </button>
          )}

          {isMobile && (
            <div className={styles.side_main}>
              <div
                className={styles.side_link}
                onClick={() => {
                  setShowHealth(true);
                }}
              >
                <Tp className={styles.icon} />
                <span className={styles.link_text}>Моё Здоровье</span>
              </div>
              <div
                className={styles.side_link}
                onClick={() => {
                  setShowSettings(true);
                }}
              >
                <Settings className={styles.icon} />
                <span className={styles.link_text}>Аккаунт TPS</span>
              </div>
            </div>
          )}
        </div>

        <OverlayScrollbarsComponent
          defer
          options={{ scrollbars: { autoHide: 'leave' } }}
          className={`${styles.scrollableContent} ${!isOpen ? styles.scrollContent : ''}`}
          color={accentColor}
          style={
            {
              '--os-handle-bg': accentColor,
              '--os-track-bg': accentColor,
            } as React.CSSProperties
          }
        >
          <nav className={styles.navSection}>
            <div
              className={styles.navTitle}
              style={{
                color: accentColor,
                borderBottom: isOpen || isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : '',
              }}
              onClick={() => toggleSection('favorites')}
            >
              {isOpen || isMobile ? (
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <svg
                    width="13"
                    height="16"
                    viewBox="0 0 13 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 15V1L11 5.66667L1 10.3333"
                      stroke={accentColor}
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Избранное</span>
                </div>
              ) : (
                <div className={styles.tooltip}>Избранное</div>
              )}
              {(isOpen || isMobile) && (
                <ChevronDown
                  className={cn(styles.chevron, {
                    [styles.rotated]: !expandedSections.favorites,
                  })}
                />
              )}
            </div>
            {expandedSections.favorites && (
              <ul>
                {chatData.favoriteChats.map((chat) => (
                  <MultiChatMenuItem
                    key={chat.id}
                    {...chat}
                    isActive={chat.id === activeChatId}
                    isMobile={isMobile}
                    isOpen={isOpen}
                    onClose={handleMobileToggle}
                    onOpenMenu={setOpenedMenuId}
                    isMenuOpened={chat.id === openedMenuId}
                  />
                ))}
              </ul>
            )}
          </nav>

          <nav className={styles.navSection}>
            <div
              className={styles.navTitle}
              style={{ color: accentColor }}
              onClick={() => toggleSection('chats')}
            >
              {isOpen || isMobile ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 10,
                  }}
                >
                  <svg
                    width="15"
                    height="14"
                    viewBox="0 0 15 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14 2.93548V13H1V1H4.76316L6.47368 2.93548H14Z"
                      stroke={accentColor}
                      strokeMiterlimit="10"
                    />
                  </svg>
                  <span>Мои чаты</span>
                </div>
              ) : (
                <div className={styles.tooltip}>Мои чаты</div>
              )}
              {(isOpen || isMobile) && (
                <ChevronDown
                  className={cn(styles.chevron, {
                    [styles.rotated]: !expandedSections.chats,
                  })}
                />
              )}
            </div>
            {expandedSections.chats && (
              <ul>
                {chatData.allChats.map((chat) => (
                  <MultiChatMenuItem
                    key={chat.id}
                    {...chat}
                    isActive={chat.id === activeChatId}
                    isMobile={isMobile}
                    isOpen={isOpen}
                    onClose={handleMobileToggle}
                    onOpenMenu={setOpenedMenuId}
                    isMenuOpened={chat.id === openedMenuId}
                  />
                ))}
              </ul>
            )}
          </nav>
        </OverlayScrollbarsComponent>
      </aside>

      {isMobile && (
        <button
          className={`${styles.burgerBtn} ${isMobile && isMobileOpen ? styles.mobileOpener : ''}`}
          onClick={handleMobileToggle}
        >
          <Burger />
        </button>
      )}

      <MyHealth open={showHealth} onClose={() => setShowHealth(false)} />
      <UserSettings open={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
};
