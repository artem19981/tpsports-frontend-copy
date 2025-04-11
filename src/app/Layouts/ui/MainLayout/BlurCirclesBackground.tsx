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
  color?: string | string[];
}

export const BlurCirclesBackground: FC<BlurCirclesBackgroundProps> = ({
  circleCount = 4,
  minSizeFactor = 2,
  maxSizeFactor = 4.09,
  sizeChangeSpeed = 0.5,
  movementSpeed = 0.5,
  blurAmount = 60,
  color = '#05EFB6',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
      element: HTMLDivElement;
      phase: number;
      speedFactor: number;
    }> = [];

    const random = (min: number, max: number) => Math.random() * (max - min) + min;
    const randomSign = () => (Math.random() > 0.5 ? 1 : -1);

    const colors = Array.isArray(color) ? color : [color];
    const colorCount = colors.length;

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
      element.style.background = colors[i % colorCount];
      element.style.willChange = 'transform, width, height';

      // Добавляем больше вариативности в параметры движения
      const speedFactor = random(0.7, 1.3); // Разные множители скорости
      const phase = random(0, Math.PI * 2); // Полностью случайные фазы

      const circle = {
        x: random(size, width - size),
        y: random(size, height - size),
        vx: random(0.5, 1) * movementSpeed * randomSign() * speedFactor,
        vy: random(0.5, 1) * movementSpeed * randomSign() * speedFactor,
        size: size * minSizeFactor,
        minSize: size * minSizeFactor,
        maxSize: size * maxSizeFactor,
        element: element,
        phase: phase,
        speedFactor: speedFactor,
      };

      element.style.width = `${circle.size}px`;
      element.style.height = `${circle.size}px`;
      element.style.left = `${circle.x}px`;
      element.style.top = `${circle.y}px`;

      container.appendChild(element);
      circles.push(circle);
    }

    let lastTime = 0;
    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const deltaTime = Math.min(100, time - lastTime); // Ограничиваем максимальное время между кадрами
      lastTime = time;

      circles.forEach((circle) => {
        // Более сложное изменение направления при отражении
        const nextX = circle.x + circle.vx * (deltaTime / 16);
        const nextY = circle.y + circle.vy * (deltaTime / 16);
        const radius = circle.size / 2;

        if (nextX - radius < 0 || nextX + radius > width) {
          // Добавляем небольшую случайность при отражении
          circle.vx *= -1 * random(0.9, 1.1);
          circle.x = Math.max(radius, Math.min(width - radius, nextX));
          // Небольшое изменение вертикальной скорости при отражении от горизонтальных границ
          circle.vy *= random(0.95, 1.05);
        } else {
          circle.x = nextX;
        }

        if (nextY - radius < 0 || nextY + radius > height) {
          // Аналогично для вертикального отражения
          circle.vy *= -1 * random(0.9, 1.1);
          circle.y = Math.max(radius, Math.min(height - radius, nextY));
          // Небольшое изменение горизонтальной скорости при отражении от вертикальных границ
          circle.vx *= random(0.95, 1.05);
        } else {
          circle.y = nextY;
        }

        // Анимация размера с индивидуальной скоростью
        const timeFactor = time * 0.001 * sizeChangeSpeed * circle.speedFactor;
        const cycle = Math.sin(timeFactor + circle.phase);
        circle.size = circle.minSize + ((circle.maxSize - circle.minSize) * (cycle + 1)) / 2;

        circle.element.style.left = `${circle.x}px`;
        circle.element.style.top = `${circle.y}px`;
        circle.element.style.width = `${circle.size}px`;
        circle.element.style.height = `${circle.size}px`;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

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
        overflow: 'hidden',
      }}
    />
  );
};
