"use client";

import ChevronDown from "@/app/assets/images/aiChat/arrow-down.svg?component";
import Burger from "@/app/assets/images/aiChat/burger.svg?component";
import Settings from "@/app/assets/images/aiChat/settings.svg?component";
import Side from "@/app/assets/images/aiChat/side.svg?component";
import Tp from "@/app/assets/images/aiChat/tp.svg?component";
import cn from "classnames";
import { useChatType } from "entities/chat/ui";
import { useRouter } from "next/navigation";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import React, { FC, useEffect, useState } from "react";
import { BOTS } from "shared/constants/bots";

import styles from "./Sidebar.module.scss";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 490);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const isMobile = useIsMobile();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const { chatType } = useChatType() || {};
  const currentBot = BOTS.find((bot) => bot.name === chatType);
  const accentColor = currentBot?.borderColor || "#00ffb0";
  const activeBgColor = currentBot
    ? "rgba(255,255,255,0.1)"
    : "rgba(0,255,176,0.1)";

  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState({
    favorites: true,
    chats: true,
  });

  const favorites = [
    { id: 1, label: "Рост мышц без вреда" },
    { id: 2, label: "Как получить красивое..." },
    { id: 3, label: "Правильное питание" },
  ];

  const myChats = [
    { id: 4, label: "Рост мышц без вреда." },
    { id: 5, label: "Как получить красивое...." },
    { id: 6, label: "Правильное питание." },
  ];

  const handleClickItem = (label: string) => {
    setActiveItem(label);

    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const toggleSection = (section: "favorites" | "chats") => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  useEffect(() => {
    const child = document.getElementById("children");

    if (!isMobileOpen && child) {
      setIsMobileOpen(false);
      child.style.opacity = "1";
      child.style.transition = "opacity 0.3s ease ";
    }
    if (child && isMobileOpen) {
      child.style.opacity = "0";
    }
    console.log(isOpen, isMobileOpen);
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
          }
        )}
      >
        <div className={styles.topSection}>
          {!isMobile && isOpen ? (
            <div className={styles.side_main}>
              <div
                className={styles.side_link}
                onClick={() => {
                  router.push(`/user-settings`);
                }}
              >
                <Tp className={styles.icon} />
                <span className={styles.link_text}>Мой Кабинет</span>
              </div>
              <div
                className={styles.side_link}
                onClick={() => {
                  router.push(`/user-settings`);
                }}
              >
                <Settings className={styles.icon} />
                <span className={styles.link_text}>Настройки</span>
              </div>
            </div>
          ) : null}

          {!isMobile && !isOpen ? (
            <div className={styles.side_main_collapsed}>
              <div className={styles.side_link}>
                <Tp className={styles.icon} />
              </div>
              <div className={styles.side_link}>
                <Settings className={styles.icon} />
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
                  router.push(`/user-settings`);
                }}
              >
                <Tp className={styles.icon} />
                <span className={styles.link_text}>Мой Кабинет</span>
              </div>
              <div
                className={styles.side_link}
                onClick={() => {
                  router.push(`/user-settings`);
                }}
              >
                <Settings className={styles.icon} />
                <span className={styles.link_text}>Настройки</span>
              </div>
            </div>
          )}
        </div>

        <OverlayScrollbarsComponent
          defer
          options={{ scrollbars: { autoHide: "leave" } }}
          className={styles.scrollableContent}
          color={accentColor}
          style={
            {
              "--os-handle-bg": accentColor,
              "--os-track-bg": accentColor,
            } as React.CSSProperties
          }
        >
          <nav className={styles.navSection}>
            <div
              className={styles.navTitle}
              style={{
                color: accentColor,
                borderBottom:
                  isOpen || isMobile
                    ? "1px solid rgba(255, 255, 255, 0.1)"
                    : "",
              }}
              onClick={() => toggleSection("favorites")}
            >
              {isOpen || isMobile ? (
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
                >
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
                {favorites.map((fav) => (
                  <li
                    key={fav.id}
                    className={cn(styles.navItem, {
                      [styles.active]: fav.label === activeItem,
                    })}
                    onClick={() => handleClickItem(fav.label)}
                    style={{
                      borderBottom:
                        isOpen || isMobile
                          ? "1px solid rgba(255, 255, 255, 0.1)"
                          : "",
                      ...(fav.label === activeItem
                        ? {
                            borderLeft: `2px solid ${accentColor}`,
                          }
                        : {}),
                    }}
                  >
                    {isOpen || isMobile ? (
                      <>
                        <span className={styles.label}>{fav.label}</span>
                        <div
                          className={styles.dots}
                          style={{ color: accentColor }}
                        >
                          ...
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.tooltip}>{fav.label}</div>
                        <div
                          className={styles.dots_collapsed}
                          style={{ color: accentColor }}
                        >
                          ...
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </nav>

          <nav className={styles.navSection}>
            <div
              className={styles.navTitle}
              style={{ color: accentColor }}
              onClick={() => toggleSection("chats")}
            >
              {isOpen || isMobile ? (
                <div
                  style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
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
                {myChats.map((chat) => (
                  <li
                    key={chat.id}
                    className={cn(styles.navItem, {
                      [styles.active]: chat.label === activeItem,
                    })}
                    onClick={() => handleClickItem(chat.label)}
                    style={
                      chat.label === activeItem
                        ? {
                            borderLeft: `2px solid ${accentColor}`,
                          }
                        : {}
                    }
                  >
                    {isOpen || isMobile ? (
                      <>
                        <span className={styles.label}>{chat.label}</span>
                        <div
                          className={styles.dots}
                          style={{ color: accentColor }}
                        >
                          ...
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.tooltip}>{chat.label}</div>
                        <div className={styles.dots_collapsed}>...</div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </nav>
        </OverlayScrollbarsComponent>
      </aside>

      {isMobile && (
        <button
          className={`${styles.burgerBtn} ${isMobile && isMobileOpen ? styles.mobileOpener : ""}`}
          onClick={handleMobileToggle}
        >
          <Burger />
        </button>
      )}
    </>
  );
};
