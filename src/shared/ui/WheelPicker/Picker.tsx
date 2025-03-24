import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './WheelPicker.module.scss';
import { WheelItem } from './types';
import { v4 as uuid } from 'uuid';
import classNames from 'classnames';
import { getOpacityForItem } from './config';

interface WheelPickerProps {
  options: WheelItem[];
  selectedIndex: number;
  visibleItems?: number;
  itemHeight?: number;
  opacityMultiplier?: number;

  postfix?: string;
  header?: string;

  pickerItemClassName?: string;
  containerClassName?: string;
  onChange: (index: number) => void;
}

export const Picker = ({
  options,
  selectedIndex,
  itemHeight = 40,
  visibleItems = 5,
  postfix,
  header,
  pickerItemClassName,
  containerClassName,
  onChange,
}: WheelPickerProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const paddingCount = Math.floor(visibleItems / 2);
  const [internalIndex, setInternalIndex] = useState<number>(
    selectedIndex === 0 ? selectedIndex : selectedIndex + paddingCount
  );

  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const extendedOptions = useMemo(
    () => [
      ...Array(paddingCount).fill({ id: uuid(), label: '', value: '' }),
      ...options,
      ...Array(paddingCount).fill({ id: uuid(), label: '', value: '' }),
    ],
    [options, paddingCount]
  );

  useEffect(() => {
    centerItem(selectedIndex, true);
  }, [selectedIndex]);

  const centerItem = (index: number, instantScroll?: boolean) => {
    if (listRef.current) {
      const scrollPosition =
        (index + paddingCount) * itemHeight -
        listRef.current.clientHeight / 2 +
        itemHeight / 2;

      listRef.current.scrollTo({
        top: scrollPosition,
        behavior: instantScroll ? 'instant' : 'smooth',
      });
    }
  };

  const handleScroll = useCallback(() => {
    if (!listRef.current) return;

    requestAnimationFrame(() => {
      const scrollTop = listRef.current!.scrollTop;
      const containerHeight = listRef.current!.clientHeight;
      const centerIndex = Math.round(
        (scrollTop + containerHeight / 2 - itemHeight / 2) / itemHeight
      );

      setInternalIndex(centerIndex - paddingCount);

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        handleScrollEnd();
      }, 100);
    });
  }, [itemHeight, paddingCount]);

  const handleScrollEnd = useCallback(() => {
    if (!listRef.current) return;

    const scrollTop = listRef.current.scrollTop;
    const containerHeight = listRef.current.clientHeight;
    const centerIndex = Math.round(
      (scrollTop + containerHeight / 2 - itemHeight / 2) / itemHeight
    );
    const realIndex = centerIndex - paddingCount;

    if (realIndex >= 0 && realIndex < options.length) {
      setInternalIndex(realIndex);
      onChange(realIndex);
      centerItem(realIndex);
    }
  }, [itemHeight, options.length, paddingCount, onChange]);

  const handleItemClick = useCallback(
    (idx: number) => {
      if (idx >= 0 && idx < options.length) {
        setInternalIndex(idx);
        onChange(idx);
        centerItem(idx);
      }
    },
    [onChange, options.length]
  );

  return (
    <div className={styles.picker}>
      {header && <div className={styles.pickerHeader}>{header}</div>}

      <div
        ref={listRef}
        onScroll={handleScroll}
        className={classNames(
          styles.pickerContainer,
          'hide-scroll',
          containerClassName
        )}
        style={{ height: visibleItems * itemHeight }}
      >
        {extendedOptions.map((option, index) => {
          const realIndex = index - paddingCount;
          const isPlaceholder = realIndex < 0 || realIndex >= options.length;
          const distance = Math.abs(realIndex - internalIndex);
          const opacity = isPlaceholder
            ? 0
            : getOpacityForItem(distance, visibleItems);

          return (
            <div
              key={index}
              onClick={() => !isPlaceholder && handleItemClick(realIndex)}
              className={classNames(styles.pickerItem, pickerItemClassName)}
              style={{
                opacity: Math.max(opacity, 0.1),
                height: itemHeight,
                cursor: isPlaceholder ? 'default' : 'pointer',
                visibility: isPlaceholder ? 'hidden' : 'visible',
              }}
            >
              {option.label}

              {postfix && distance === 0 && (
                <span className={styles.postfix}>{postfix}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
