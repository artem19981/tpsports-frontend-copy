"use client";

import { Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ToggleButtons } from "shared/ui";
import { pricingCards } from "./config";
import { PricingCard, PricingCardProps } from "./PricingCard";
import styles from "./PricingPlans.module.scss";

interface ExtendedPricingCardProps extends PricingCardProps {
  // Храним исходную месячную цену
  rawPrice: number;
}

export const PricingPlans = (user: any) => {
  const router = useRouter();
  const [showYears, setShowYears] = useState(false);

  const handleSubscribe = (plan: ExtendedPricingCardProps) => {
    if (plan.buttonText === "Связаться") {
      window.location.href = "mailto:business@tpsports.com";
      return;
    }
    router.push("/registration");
  };

  return (
    <div className={styles.main}>
      <Stack
        direction="row"
        alignItems="center"
        flexWrap="wrap"
        sx={{
          justifyContent: { xs: "center", md: "space-between" },
          gap: 4,
          mb: { xs: 4, md: 6 },
          maxWidth: 1200,
          paddingRight: { xs: 2, lg: 0 },
          paddingLeft: { xs: 2, lg: 0 },
          mr: { xs: 2, md: 0 },
        }}
      >
        <Typography variant="h3" className={styles.title}>
          Тарифные планы
        </Typography>

        <ToggleButtons
          className={styles.buttons}
          value={showYears}
          onChange={() => setShowYears((prev) => !prev)}
          activeButtonBackground="#D9D9D9"
          buttons={[
            {
              value: true,
              children: (
                <Typography className={styles.toggleButtonText}>
                  <span
                    style={showYears ? { color: "#000" } : { color: "#fff" }}
                  >
                    Ежегодно -{" "}
                  </span>
                  <span
                    style={
                      showYears ? { color: "#158c3d" } : { color: "#01FC54" }
                    }
                  >
                    Скидка 20%{" "}
                  </span>
                </Typography>
              ),
            },
            {
              value: false,
              children: (
                <Typography className={styles.toggleButtonText}>
                  Ежемесячно
                </Typography>
              ),
            },
          ]}
        />
      </Stack>

      <Stack
        direction="row"
        gap={3}
        flexWrap="nowrap"
        maxWidth={1200}
        justifyContent="space-between"
        sx={{
          overflowX: "scroll",
          paddingTop: 4,
          scrollbarWidth: "none",
        }}
      >
        {pricingCards.map((card, idx) => {
          const monthlyPrice = Number(card.price);
          // При переключении на ежегодный режим цена за месяц считается со скидкой 20%
          const discountedMonthlyPrice = monthlyPrice * (showYears ? 0.8 : 1);
          const formattedPrice =
            new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
              discountedMonthlyPrice
            ) + " ₽ / месяц";

          let billingText;
          // Для последней карточки billing не выводим
          if (idx === pricingCards.length - 1) {
            billingText = undefined;
          } else {
            billingText = showYears
              ? `Счёт выставляется ежегодно на ${new Intl.NumberFormat(
                  "ru-RU",
                  {
                    maximumFractionDigits: 0,
                  }
                ).format(monthlyPrice * 12 * 0.8)} ₽`
              : card.billing;
          }

          return (
            <PricingCard
              key={idx}
              {...card}
              price={formattedPrice}
              billing={billingText}
              onSubscribe={() =>
                handleSubscribe({
                  ...card,
                  rawPrice: monthlyPrice,
                } as ExtendedPricingCardProps)
              }
            />
          );
        })}
      </Stack>
    </div>
  );
};
