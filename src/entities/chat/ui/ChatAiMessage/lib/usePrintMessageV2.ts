import { useEffect, useRef, useState } from 'react';

const MIN_CHARS_PER_FRAME = 1;
const MAX_CHARS_PER_FRAME = 30;

interface Props {
  withAnimation: boolean;
  messageText: string;
  isGPTMessageStreaming: boolean;
  onEndPrint: () => void;
}

export const usePrintMessageV2 = ({
  withAnimation,
  messageText,
  isGPTMessageStreaming,
  onEndPrint,
}: Props) => {
  const [displayedText, setDisplayedText] = useState(withAnimation ? '' : messageText);

  const messageRef = useRef(messageText);
  const isGPTMessageStreamingRef = useRef(isGPTMessageStreaming);
  const lastFrameTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    messageRef.current = messageText;
  }, [messageText]);

  useEffect(() => {
    isGPTMessageStreamingRef.current = isGPTMessageStreaming;

    if (!isGPTMessageStreaming) {
      setDisplayedText(messageRef.current);
    }
  }, [isGPTMessageStreaming]);

  useEffect(() => {
    if (!withAnimation) {
      setDisplayedText(messageRef.current);
      return;
    }

    let currentIndex = 0;
    let frameId: number;

    const printNextChar = () => {
      const now = performance.now();

      const totalLength = messageRef.current.length;
      const remainingChars = totalLength - currentIndex;

      // Чем больше осталось, тем больше печатаем за кадр
      // Нормализуем значение в диапазоне от MIN до MAX
      let charsPerFrame = Math.ceil((remainingChars / totalLength) * MAX_CHARS_PER_FRAME);
      charsPerFrame = Math.max(MIN_CHARS_PER_FRAME, Math.min(charsPerFrame, MAX_CHARS_PER_FRAME));

      if (remainingChars > 0) {
        currentIndex += charsPerFrame;
        currentIndex = Math.min(currentIndex, totalLength);
        setDisplayedText(messageRef.current.slice(0, currentIndex));
      }

      lastFrameTimeRef.current = now;

      if (currentIndex >= totalLength && !isGPTMessageStreamingRef.current) {
        cancelAnimationFrame(frameId);
        onEndPrint();
        return;
      }

      frameId = requestAnimationFrame(printNextChar);
    };

    printNextChar();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [withAnimation, onEndPrint]);

  return displayedText;
};
