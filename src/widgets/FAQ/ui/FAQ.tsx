"use client";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./FAQ.module.scss";
import { faqData } from "./config";

export interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [expanded, setExpanded] = useState<number | false>(0);

  const handleChange =
    (panelIndex: number) => (event: React.SyntheticEvent, isOpen: boolean) => {
      setExpanded(isOpen ? panelIndex : false);
    };

  return (
    <Box
      component="section"
      sx={{
        color: "#fff",
        pb: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontSize: { sx: 25, md: 40 }, mb: 2, fontWeight: "bold" }}
      >
        ЕСТЬ ВОПРОСЫ?
      </Typography>
      <Typography
        variant="body2"
        sx={{ mb: 4, maxWidth: 300, opacity: 0.8 }}
        className={styles.gilroy}
      >
        Если у вас есть вопросы, ниже вы можете увидеть самые частые вопросы и
        ответы.
      </Typography>

      {faqData.map((item, index) => {
        const isExpanded = expanded === index;

        return (
          <Accordion
            key={index}
            disableGutters
            expanded={isExpanded}
            onChange={handleChange(index)}
            sx={{
              background: "none",
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              expandIcon={
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="25.3379"
                    y1="12.6104"
                    x2="12.61"
                    y2="25.3383"
                    stroke={isExpanded ? "#01FC53" : "white"}
                  />
                  <line
                    x1="13.082"
                    y1="25.1026"
                    x2="0.354073"
                    y2="12.3747"
                    stroke={isExpanded ? "#01FC53" : "white"}
                  />
                </svg>
              }
              sx={{
                paddingLeft: 0,
              }}
            >
              <Typography
                variant="h6"
                sx={{ fontWeight: 500 }}
                className={styles.gilroy}
              >
                {item.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ pb: 2, pl: 0 }}>
              <Typography
                variant="body2"
                sx={{ opacity: 0.5, maxWidth: 800 }}
                className={styles.gilroy}
              >
                {item.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default FAQ;
