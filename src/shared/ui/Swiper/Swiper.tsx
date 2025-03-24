'use client';

import React, { ReactNode, useState, useRef, useEffect } from 'react';
import { Swiper as _Swiper, SwiperRef } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import { useMediaQuery, Skeleton } from '@mui/material';
import styles from './Swiper.module.scss';
import Image from 'next/image';
import chevron from './assets/leftChevron.png';
import { Swiper as SwiperType } from 'swiper/types';
import classNames from 'classnames';

interface SwiperProps {
  children: ReactNode;

  withArrows?: boolean;
  containerClassName?: string;
}

export function Swiper({
  children,
  withArrows = true,
  containerClassName,
}: SwiperProps) {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const [isReady, setIsReady] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const [resetAutoplay, setResetAutoplay] = useState(false);

  const handlePrev = () => {
    if (swiperRef.current) {
      setResetAutoplay((prev) => !prev);
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      setResetAutoplay((prev) => !prev);
      swiperRef.current.slideNext();
    }
  };

  useEffect(() => {
    if (!swiperRef.current) {
      return;
    }

    const intervalId = setInterval(() => {
      swiperRef.current!.slideNext();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, [swiperRef.current, resetAutoplay]);

  const showArrows = withArrows && !isMobile;

  return (
    <div className={classNames(styles.container, containerClassName)}>
      {showArrows && (
        <div className={styles.arrowContainer} onClick={handlePrev}>
          <Image src={chevron} alt="arrowLeft" width={19} height={19} />
        </div>
      )}

      <div className={styles.swiperContainer}>
        {!isReady && (
          <div className={styles.loader}>
            <Skeleton variant="rectangular" width="100%" height={100} />
          </div>
        )}

        <_Swiper
          spaceBetween={0}
          slidesPerView="auto"
          centeredSlides={true}
          direction="horizontal"
          speed={1000}
          freeMode={true}
          loop={true}
          grabCursor={true}
          style={{
            transition: 'opacity 0.3s ease-in-out',
            opacity: isReady ? 1 : 0,
          }}
          onSwiper={(swiper) => {
            setIsReady(true);
            swiperRef.current = swiper;
          }}
        >
          {children}
        </_Swiper>
      </div>

      {showArrows && (
        <div className={styles.arrowContainer} onClick={handleNext}>
          <Image
            src={chevron}
            alt="arrowLeft"
            width={19}
            height={19}
            className={styles.rightIcon}
          />
        </div>
      )}
    </div>
  );
}
