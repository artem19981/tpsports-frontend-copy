"use client";

import { useMutation } from "@tanstack/react-query";
import { createPayment } from "features/Payment/api/createPayment";
import { UserProfile } from "features/User/model";
import { useEffect, useRef } from "react";
import { PricingCardProps } from "widgets/PricingPlans/ui/PricingCard";
import { useTinkoffScript } from "./useTinkoffScript";

interface PaymentWidgetProps {
  plan: PricingCardProps;
  finalPrice: number;
  user: UserProfile;
}

export const PaymentWidget: React.FC<PaymentWidgetProps> = ({
  plan,
  finalPrice,
  user,
}) => {
  const scriptLoaded = useTinkoffScript();
  const formRef = useRef<HTMLFormElement>(null);

  const { mutateAsync: createOrder } = useMutation({
    mutationFn: createPayment,
  });

  useEffect(() => {
    const processPayment = async () => {
      if (
        !user.email
        // !user.phone_number ||
        // !(user.first_name && user.last_name)
      ) {
        alert("Пожалуйста, заполните профиль (email) для оплаты.");
        return;
      }

      if (!scriptLoaded) {
        console.log("Ожидание загрузки скрипта Tinkoff...");
        return;
      }

      try {
        const order = await createOrder();
        console.log(order);

        if (formRef.current) {
          const orderInput = formRef.current.querySelector(
            'input[name="order"]'
          );
          if (orderInput) {
            (orderInput as any).value = order;
          }

          const receiptInput = formRef.current.querySelector(
            'input[name="receipt"]'
          );
          if (receiptInput) {
            const receiptData = {
              EmailCompany: "mail@mail.com",
              Taxation: "patent", // замените на используемую систему налогообложения
              FfdVersion: "1.2",
              Items: [
                {
                  Name: plan.title || "Оплата",
                  Price: Math.round(finalPrice * 100),
                  Quantity: 1.0,
                  Amount: Math.round(finalPrice * 100),
                  PaymentMethod: "full_prepayment",
                  PaymentObject: "service",
                  Tax: "none",
                  MeasurementUnit: "pc",
                },
              ],
            };

            (receiptInput as any).value = JSON.stringify(receiptData);
          }
        }

        if ((window as any).pay && formRef.current) {
          (window as any).pay(formRef.current);
        } else {
          console.error(
            "Функция оплаты не доступна. Проверьте подключение скрипта."
          );
        }
      } catch (error) {
        console.error("Ошибка при создании платежа:", error);
      }
    };

    processPayment();
  }, [user, scriptLoaded, createOrder]);

  return (
    <form
      ref={formRef}
      className="payform-tbank"
      name="payform-tbank"
      style={{ display: "none" }}
    >
      <input type="hidden" name="terminalkey" value="1734340826447DEMO" />
      <input type="hidden" name="frame" value="false" />
      <input type="hidden" name="language" value="ru" />
      <input type="text" name="amount" value={finalPrice} readOnly />
      <input type="hidden" name="order" value="" />
      <input type="hidden" name="receipt" value="" />
      <input
        type="text"
        name="description"
        value={`Оплата тарифа ${plan.title}`}
        readOnly
      />
      <input
        type="text"
        name="name"
        value={`${user.first_name} ${user.last_name}`}
        readOnly
      />
      <input type="email" name="email" value={user.email} readOnly />
      <input
        type="tel"
        name="phone"
        value={user.phone_number as any}
        readOnly
      />
      <input type="submit" value="Оплатить" />
    </form>
  );
};
