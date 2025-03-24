"use client";

import infoSrc from "@/app/assets/images/common/info.png";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import React, { useState } from "react";
import styles from "./ResponsiveTooltip.module.scss";

export function ResponsiveTooltip({
  title,
  className,
  right,
}: {
  title: string;
  className?: string;
  right?: boolean;
}) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <Tooltip
      title={title}
      open={open}
      onClose={handleClose}
      onOpen={isMobile ? undefined : handleOpen}
      leaveTouchDelay={10000}
      placement={right ? "right" : "top"}
      arrow
      classes={{ tooltip: `${right ? styles.right : styles.tooltip}` }}
    >
      <span
        onClick={handleClick}
        onMouseEnter={isMobile ? undefined : handleOpen}
        onMouseLeave={isMobile ? undefined : handleClose}
        style={{ cursor: "pointer", display: "inline-block" }}
        className={className}
      >
        <Image src={infoSrc} width={14} height={14} alt="info" />
      </span>
    </Tooltip>
  );
}
