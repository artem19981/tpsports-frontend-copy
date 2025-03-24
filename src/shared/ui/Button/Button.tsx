"use client";

import { MouseEventHandler } from "react";

import { ButtonProps as _ButtonProps } from "@mui/material";
import MuiButton from "@mui/material/Button";

import cn from "classnames";
import { useRouter } from "next/navigation";

import styles from "./Button.module.scss";

export interface ButtonProps extends Omit<_ButtonProps, "variant"> {
  variant?: "green" | "white" | "transparent" | "gray" | "lightgray";
}

export const Button = ({ href, variant, ...props }: ButtonProps) => {
  const router = useRouter();

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (props.onClick) {
      props.onClick(e);
    }

    if (href) {
      router.push(href);
    }
  };

  return (
    <MuiButton
      fullWidth
      variant="contained"
      {...props}
      onClick={onClick}
      className={cn(styles.button, props.className, {
        [styles.white]: variant === "white",
        [styles.transparent]: variant === "transparent",
        [styles.gray]: variant === "gray",
        [styles.lightgray]: variant === "lightgray",
      })}
    />
  );
};
