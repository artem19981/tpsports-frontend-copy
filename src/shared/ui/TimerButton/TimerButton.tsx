'use client';

import { useState, useEffect } from 'react';
import styles from './TimerButton.module.scss';
import { Button, ButtonProps } from '../Button/Button';

const TIMER = 30_000;

interface TimerButtonProps extends ButtonProps {
  text: string;
  interval?: number;
  intervalText: string;
  isUseTimerAtMount?: boolean;

  onClick: () => void;
}

export const TimerButton = ({
  text,
  interval = TIMER,
  intervalText,
  isUseTimerAtMount = true,
  onClick,
  ...props
}: TimerButtonProps) => {
  const [isDisabled, setIsDisabled] = useState(isUseTimerAtMount);
  const [remainingTime, setRemainingTime] = useState(() => (isUseTimerAtMount ? interval : 0));

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isDisabled && remainingTime > 0) {
      timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1000) {
            setIsDisabled(false);
            return 0;
          }
          return prevTime - 1000;
        });
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isDisabled, remainingTime]);

  const handleClick = () => {
    setIsDisabled(true);
    setRemainingTime(interval);
    onClick();
  };

  const formatTime = (ms: number) => {
    const seconds = Math.ceil(ms / 1000);
    return ` ${seconds} сек`;
  };

  return (
    <Button
      {...props}
      disabled={isDisabled || props.disabled}
      onClick={handleClick}
      aria-label={text}
      tabIndex={0}
    >
      {isDisabled ? (
        <>
          {intervalText} <span className={styles.timer}>{formatTime(remainingTime)}</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};
