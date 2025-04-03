"use client";

import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ToggleButtons } from "shared/ui";
import { pricingCards } from "widgets/PricingPlans/ui/config";
import { PaymentWidget } from "widgets/TinkoffWidget/PaymentWidget";
import {
  PricingCard,
  PricingCardProps,
} from "../../PricingPlans/ui/PricingCard";
import styles from "./Tariff.module.scss";

interface ExtendedPricingCardProps extends PricingCardProps {
  rawPrice: number;
}

export const Tariff = (user: any) => {
  const [showYears, setShowYears] = useState(false);
  const [selectedPlan, setSelectedPlan] =
    useState<ExtendedPricingCardProps | null>(null);

  const activeTariffName = user.user.tariff?.name;
  const activeTariff = user.user;
  console.log(activeTariff.tariff.tariff_type);

  const handleSubscribe = (plan: ExtendedPricingCardProps) => {
    if (plan.buttonText === "Связаться") {
      window.location.href = "mailto:business@tpsports.com";
      return;
    }
    if (activeTariffName === plan.title) {
      return;
    }
    setSelectedPlan(plan);
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
          const discountedMonthlyPrice = monthlyPrice * (showYears ? 0.8 : 1);
          const formattedPrice =
            new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 }).format(
              discountedMonthlyPrice
            ) + " ₽ / месяц";

          let billingText;
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

          let buttonText =
            card.buttonText === "Связаться"
              ? card.buttonText
              : `Выбрать ${card.title}`;
          let buttonColor = card.buttonColor;

          if (
            activeTariff &&
            activeTariff.tariff.tariff === card.title &&
            card.buttonText !== "Связаться"
          ) {
            if (
              activeTariff.tariff.tariff_type === (showYears ? "year" : "month")
            ) {
              buttonText = "Мой текущий тариф";
              buttonColor = "lightgray";
            } else if (activeTariff.tariff.tariff_type === "year") {
              buttonText = "Мой текущий тариф";
              buttonColor = "lightgray";
            } else {
              buttonText = "Продлить тариф";
              buttonColor = "lightgray";
            }
          }

          return (
            <PricingCard
              key={idx}
              {...card}
              price={formattedPrice}
              billing={billingText}
              buttonText={buttonText}
              buttonColor={buttonColor}
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

      {selectedPlan && (
        <PaymentWidget
          plan={selectedPlan}
          finalPrice={
            showYears ? selectedPlan.rawPrice * 12 * 0.8 : selectedPlan.rawPrice
          }
          user={user.user}
        />
      )}
    </div>
  );
};
