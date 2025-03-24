'use client';

import React, { memo, useEffect, useRef, useState } from 'react';
import baseAnimationJson from '@/app/assets/animations/Base.json';
import Lottie, { LottieComponentProps } from 'lottie-react';
import { useOptimizeLogo } from './lib/useOptimizeLogo';

interface Props extends Omit<LottieComponentProps, 'animationData'> {
  animation?: any;
}

export const AnimatedLogo = memo(
  ({ animation = baseAnimationJson, ...props }: Props) => {
    const { isVisible, ref } = useOptimizeLogo();

    return (
      <div ref={ref}>
        {isVisible ? (
          <Lottie
            animationData={animation}
            loop={true}
            autoplay={true}
            // @ts-ignore
            renderer="canvas"
            rendererSettings={{
              progressiveLoad: true,
              hideOnTransparent: true,
            }}
            {...props}
          />
        ) : (
          <div className={props.className} style={props.style} />
        )}
      </div>
    );
  }
);

AnimatedLogo.displayName = 'AnimatedLogo';
