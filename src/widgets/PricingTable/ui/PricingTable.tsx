"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { ReactNode, useState } from "react";
import CheckIcon from "shared/assets/CheckIcon.svg?component";
import CloseIcon from "shared/assets/CloseIcon.svg?component";

import { Button } from "shared/ui";
import { ResponsiveTooltip } from "shared/ui/ResponsiveTooltip";
import styles from "./PricingTable.module.scss";

interface PricingRow {
  feature: string;
  item?: ReactNode;
  info: string;
  basic: React.ReactNode;
  standard: React.ReactNode;
  pro: React.ReactNode;
  sportsClub: React.ReactNode;
}

const rows: PricingRow[] = [
  {
    feature: "Запросы",
    info: "",
    basic: "300 запросов",
    standard: "750 запросов",
    pro: "Неограниченно 🚀",
    sportsClub: "Неограниченно 🚀",
  },
  {
    feature: "Тестовый период",
    item: (
      <p>Для новых пользователей. Срок действия 14 дней после регистрации.</p>
    ),
    info: "",
    basic: "10 запросов",
    standard: <CloseIcon />,
    pro: <CloseIcon />,
    sportsClub: <CloseIcon />,
  },
  {
    feature: "Персонализация",
    info: "",
    basic: "Базовая",
    standard: "Расширенная",
    pro: "Глубокая 🔥",
    sportsClub: "Глубокая командная 🔥",
  },
  {
    feature: "Прикрепление файлов",
    info: "",
    basic: "3 / месяц",
    standard: "10 / месяц",
    pro: "Неограниченно 🚀",
    sportsClub: "Неограниченно 🚀",
  },
  {
    feature: "Уведомления и напоминания",
    info: "",
    basic: <CloseIcon />,
    standard: <CheckIcon />,
    pro: <CheckIcon />,
    sportsClub: <CheckIcon />,
  },
  {
    feature: "Покупка дополнительных запросов",
    info: "",
    basic: "10 запросов / 300 ₽",
    standard: "10 запросов / 300 ₽",
    pro: "Безлимит",
    sportsClub: "Безлимит",
  },
  {
    feature: "Экспорт данных",
    info: "",
    basic: <CloseIcon />,
    standard: <CloseIcon />,
    pro: <CheckIcon />,
    sportsClub: <CheckIcon />,
  },
  {
    feature: "Защита данных",
    info: "",
    basic: <CheckIcon />,
    standard: <CheckIcon />,
    pro: <CheckIcon />,
    sportsClub: <CheckIcon />,
  },
  {
    feature: "Техническая поддержка",
    info: "",
    basic: "E-mail",
    standard: "E-mail, Telegram, 24/7",
    pro: "Приоритетная",
    sportsClub: "Выделенная команда",
  },
  {
    feature: `Инструменты`,
    item: (
      <>
        <p>Chat Completion - Создание диалогов и ответов на запросы.</p>
        <p>
          Advanced NLP - Расширенный анализ текста для улучшения рекомендаций.
        </p>
        <p>
          Data Analysis - Анализ данных, например, прикреплённых документов.
        </p>
        <p>
          Code Interpretation - Возможность обработки сложных данных и
          выполнения вычислений.
        </p>
        <p>Custom Integration - Индивидуальная интеграция.</p>
      </>
    ),
    info: "",
    basic: "Chat Completion, Advanced NLP, Data Analysis",
    standard: "Chat Completion, Advanced NLP, Data Analysis",
    pro: "Advanced NLP, Data Analysis, Code Interpretation",
    sportsClub:
      "Advanced NLP, Data Analysis, Code Interpretation, Custom Integration",
  },
];

const PricingTable: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={styles.table}>
      <TableContainer
        component={Paper}
        className={`${styles.table__container} ${isVisible ? styles.visible : styles.hidden}`}
        sx={{
          background:
            "linear-gradient(108.85deg, rgba(48, 48, 48, 0.4) 0.8%, rgba(48, 48, 48, 0.4) 76%, rgba(65, 65, 65, 0.4) 99.1%)",
          borderRadius: 2,
          overflowX: "scroll",
          mt: 10,
          width: 1200,
          transition: "opacity 0.5s, height 1s, visibility 0.5s",
          opacity: isVisible ? 1 : 0,
          height: isVisible ? "auto" : 0,
          visibility: isVisible ? "visible" : "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                className={styles.table__cell}
                sx={{ color: "#FFFFFF66" }}
              >
                Функция
              </TableCell>
              {/* <TableCell className={styles.table__cell}>
              Инфо
            </TableCell> */}
              <TableCell
                className={`${styles.table__cell} ${styles.table__title}`}
                sx={{ color: "#01FD4D" }}
              >
                Basic
              </TableCell>
              <TableCell
                className={`${styles.table__cell} ${styles.table__title}`}
                sx={{ color: "#01FD4D" }}
              >
                Standard
              </TableCell>
              <TableCell
                className={`${styles.table__cell} ${styles.table__title}`}
                sx={{ color: "#01FD4D" }}
              >
                Pro&nbsp;
              </TableCell>
              <TableCell
                className={`${styles.table__cell} ${styles.table__title}`}
                sx={{ color: "#01FD4D" }}
              >
                Sports Club&nbsp;
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell
                  sx={{
                    textAlign: "left!important",
                    width: "auto!important",
                  }}
                  className={`${styles.table__row}`}
                >
                  {row.feature}
                  {row.item ? (
                    <ResponsiveTooltip
                      title={row.item as any}
                      className={styles.tooltip}
                      right={true}
                    />
                  ) : (
                    <></>
                  )}
                </TableCell>
                <TableCell size="small" className={styles.table__row}>
                  {row.basic}
                </TableCell>
                <TableCell className={styles.table__row}>
                  {row.standard}
                </TableCell>
                <TableCell className={styles.table__row}>{row.pro}</TableCell>
                <TableCell
                  className={styles.table__row}
                  sx={{ color: "#fff", borderBottom: "1px solid #444" }}
                >
                  {row.sportsClub}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className={styles.button__container}>
        <Button
          color="success"
          variant={"white"}
          onClick={toggleVisibility}
          sx={{ width: "280px", margin: "40px auto 0 auto" }}
        >
          {isVisible
            ? "Скрыть Сравнение тарифов"
            : "Показать Сравнение тарифов"}
        </Button>
      </div>
    </div>
  );
};

export default PricingTable;
