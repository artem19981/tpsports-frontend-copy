'use client';

import { FC, useEffect, useRef, useState } from 'react';
import styles from './BlurCirclesBackground.module.scss';

interface BlurCirclesBackgroundProps {
  circleCount?: number;
  minSizeFactor?: number;
  maxSizeFactor?: number;
  sizeChangeSpeed?: number;
  movementSpeed?: number;
  blurAmount?: number;
  color?: string;
}

export const BlurCirclesBackground: FC<BlurCirclesBackgroundProps> = ({
  circleCount = 4,
  minSizeFactor = 0.5,
  maxSizeFactor = 1.5,
  sizeChangeSpeed = 0.8,
  movementSpeed = 2.0,
  blurAmount = 60,
  color = '#05EFB6',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Обновляем размеры при изменении размеров окна
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    const container = containerRef.current;
    const { width, height } = dimensions;
    const circles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      minSize: number;
      maxSize: number;
      sizeDelta: number;
      element: HTMLDivElement;
    }> = [];

    // Helper function for random numbers
    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    // Create circles
    for (let i = 0; i < circleCount; i++) {
      const size = random(Math.min(60, width * 0.15), Math.min(200, width * 0.3));
      const element = document.createElement('div');

      element.style.position = 'absolute';
      element.style.borderRadius = '50%';
      element.style.filter = `blur(${blurAmount}px)`;
      element.style.opacity = '0.8';
      element.style.transform = 'translate(-50%, -50%)';
      element.style.transition =
        'transform 0.3s ease-out, width 0.3s ease-out, height 0.3s ease-out';
      element.style.background = color;
      element.style.willChange = 'transform, width, height';

      const circle = {
        x: random(size / 2, width - size / 2),
        y: random(size / 2, height - size / 2),
        vx: random(-movementSpeed, movementSpeed),
        vy: random(-movementSpeed, movementSpeed),
        size: size,
        minSize: size * minSizeFactor,
        maxSize: size * maxSizeFactor,
        sizeDelta: random(0.1, 0.5) * sizeChangeSpeed,
        element: element,
      };

      element.style.width = `${circle.size}px`;
      element.style.height = `${circle.size}px`;
      element.style.left = `${circle.x}px`;
      element.style.top = `${circle.y}px`;

      container.appendChild(element);
      circles.push(circle);
    }

    // Animation loop
    const animate = () => {
      circles.forEach((circle) => {
        // Calculate next position
        const nextX = circle.x + circle.vx;
        const nextY = circle.y + circle.vy;
        const radius = circle.size / 2;

        // Check boundaries with full circle size
        if (nextX - radius < 0 || nextX + radius > width) {
          circle.vx *= -1;
          circle.x = Math.max(radius, Math.min(width - radius, nextX));
        } else {
          circle.x = nextX;
        }

        if (nextY - radius < 0 || nextY + radius > height) {
          circle.vy *= -1;
          circle.y = Math.max(radius, Math.min(height - radius, nextY));
        } else {
          circle.y = nextY;
        }

        // Update size
        circle.size += circle.sizeDelta;
        if (circle.size > circle.maxSize || circle.size < circle.minSize) {
          circle.sizeDelta *= -1;
          circle.size = Math.max(circle.minSize, Math.min(circle.maxSize, circle.size));
        }

        // Apply changes to DOM element
        circle.element.style.left = `${circle.x}px`;
        circle.element.style.top = `${circle.y}px`;
        circle.element.style.width = `${circle.size}px`;
        circle.element.style.height = `${circle.size}px`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      circles.forEach((circle) => {
        if (container.contains(circle.element)) {
          container.removeChild(circle.element);
        }
      });
    };
  }, [
    dimensions,
    circleCount,
    minSizeFactor,
    maxSizeFactor,
    sizeChangeSpeed,
    movementSpeed,
    blurAmount,
    color,
  ]);

  return (
    <div
      ref={containerRef}
      className={styles.backgroundAnimation}
      style={{
        position: 'absolute',
        width: '100%',
        maxWidth: 1320,
        maxHeight: 780,
        height: '100%',
        overflow: 'hidden',
        zIndex: 1,
        // top: 0,
        // left: 0,
      }}
    />
  );
};
