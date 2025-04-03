"use client";

import {
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import Border from "shared/assets/Border.svg?component";
import { Button } from "shared/ui";
import styles from "./PricingPlans.module.scss";

export interface PricingCardProps {
  title: string;
  supTitle?: string;
  price: number | string;
  billing?: string;
  description: string;
  features: string[];
  buttonText: string;
  trial?: { text: string; color: string; background: string };
  buttonColor?: "lightgray" | "white";
  onSubscribe?: () => void;
  highlightConfig?: {
    color: string;
  };
}

export const PricingCard = ({
  title,
  supTitle,
  price,
  billing,
  description,
  features,
  buttonText,
  trial,
  buttonColor,
  onSubscribe,
  highlightConfig,
}: PricingCardProps) => {
  const renderHighlightedText = (text: string) => {
    if (!highlightConfig) return text;

    const parts = text.split(/(\*\*.*?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const highlightedText = part.slice(2, -2);
        return (
          <span key={index} style={{ color: highlightConfig.color }}>
            {highlightedText}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <Card className={styles.subscriptionCard}>
      {trial && (
        <div
          className={styles.trialBadge}
          style={{ background: trial.background, color: trial.color }}
        >
          {trial.text}
        </div>
      )}
      <CardContent className={styles.cardContent} sx={{ padding: 0 }}>
        <Typography
          variant="h6"
          fontSize={22}
          className={styles.title}
          sx={{ textAlign: "center", color: "#01FC54", lineHeight: "100%" }}
        >
          {title}
        </Typography>
        <Typography
          variant="h5"
          fontSize={23}
          className={styles.price}
          sx={{ marginTop: 2.5 }}
        >
          {supTitle ? supTitle : price}
        </Typography>
        {billing && price !== 0 && (
          <Typography
            variant="body2"
            fontSize={11}
            className={styles.billing}
            sx={{ marginTop: 1.5 }}
          >
            {billing}
          </Typography>
        )}
        <Typography
          variant="body2"
          className={styles.description}
          sx={{ marginTop: 2.2 }}
        >
          {description}
        </Typography>
        <Stack className={styles.features}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <Typography variant="body2" className={styles.gilroy}>
                {renderHighlightedText(feature)}
              </Typography>
              <Border />
            </li>
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Button
          color="success"
          variant={buttonColor ? buttonColor : undefined}
          fullWidth
          className={styles.subscribeButton}
          onClick={onSubscribe}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};
