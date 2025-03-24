import { useLayoutEffect, useRef, useState } from 'react';
import styles from './WheelPicker.module.scss';
import { WheelItem } from './types';
import classNames from 'classnames';
import { getOpacityForItem } from './config';

interface WheelPickerProps {
  options: WheelItem[];
  selectedIndex: number;
  visibleItems?: number;
  itemHeight?: number;
  opacityMultiplier?: number;

  pickerItemClassName?: string;

  onChange: (index: number) => void;
}

export const MobilePicker = ({
  options,
  selectedIndex,
  itemHeight = 40,
  visibleItems = 5,
  pickerItemClassName,
  onChange,
}: WheelPickerProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const [internalIndex, setInternalIndex] = useState<number>(selectedIndex);
  const [emptyBlocksHeight, setEmptyBlocksHeight] = useState<number>(0);

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useLayoutEffect(() => {
    const height = listRef.current?.getBoundingClientRect().height;

    if (!height) {
      return;
    }

    setEmptyBlocksHeight(height / 2 - itemHeight / 2);
  }, []);

  useLayoutEffect(() => {
    if (!emptyBlocksHeight) {
      return;
    }

    centerItem(selectedIndex, true);
  }, [emptyBlocksHeight, selectedIndex]);

  const centerItem = (index: number, instantScroll?: boolean) => {
    if (listRef.current) {
      const scrollPosition = index * itemHeight;

      listRef.current.scrollTo({
        top: scrollPosition,
        behavior: instantScroll ? 'instant' : 'smooth',
      });
    }
  };

  const handleScroll = () => {
    if (!listRef.current) return;

    requestAnimationFrame(() => {
      const scrollTop = listRef.current!.scrollTop;
      const centerIndex = Math.round(scrollTop / itemHeight);

      setInternalIndex(centerIndex);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        handleScrollEnd();
      }, 100);
    });
  };

  const handleScrollEnd = () => {
    if (!listRef.current) return;

    const scrollTop = listRef.current.scrollTop;
    const centerIndex = Math.round(scrollTop / itemHeight);

    if (centerIndex >= 0 && centerIndex < options.length) {
      setInternalIndex(centerIndex);
      onChange(centerIndex);
      centerItem(centerIndex, true);
    }
  };

  const handleItemClick = (realIndex: number) => {
    if (realIndex >= 0 && realIndex < options.length) {
      setInternalIndex(realIndex);
      onChange(realIndex);
      centerItem(realIndex);
    }
  };

  return (
    <div
      ref={listRef}
      onScroll={handleScroll}
      className={classNames(styles.pickerContainer, 'hide-scroll')}
      style={{ height: visibleItems * itemHeight }}
    >
      <div>
        <div style={{ height: emptyBlocksHeight, width: '100%' }} />
        {options.map((option, index) => {
          const isPlaceholder = index < 0 || index >= options.length;
          const distance = Math.abs(index - internalIndex);
          const opacity = isPlaceholder
            ? 0
            : getOpacityForItem(distance, visibleItems);

          return (
            <div
              key={index}
              onClick={() => !isPlaceholder && handleItemClick(index)}
              className={classNames(styles.pickerItem, pickerItemClassName)}
              style={{
                opacity: Math.max(opacity, 0.1),
                height: itemHeight,
                cursor: isPlaceholder ? 'default' : 'pointer',
                visibility: isPlaceholder ? 'hidden' : 'visible',
              }}
            >
              {option.label}
            </div>
          );
        })}
        <div style={{ height: emptyBlocksHeight, width: '100%' }} />
      </div>
    </div>
  );
};
