import { useEffect, useRef, useState } from 'react';

const MIN_VALUE = 1;

const THRESHOLDS = {
  10: MIN_VALUE,
  13: MIN_VALUE + 1,
  16: MIN_VALUE + 2,
};

interface Props {
  withAnimation: boolean;
  messageText: string;
  isGPTMessageStreaming: boolean;
  onEndPrint: () => void;
}

export const usePrintMessage = ({
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
      const timeSinceLastFrame = now - lastFrameTimeRef.current;

      let charsPerFrame = MIN_VALUE;
      for (const [threshold, chars] of Object.entries(THRESHOLDS)) {
        if (timeSinceLastFrame <= Number(threshold)) {
          charsPerFrame = chars;
          break;
        }
      }

      const isMessageLoaded = messageRef.current.length !== currentIndex;

      if (isMessageLoaded) {
        currentIndex += charsPerFrame;
        currentIndex = Math.min(currentIndex, messageRef.current.length);

        setDisplayedText(messageRef.current.slice(0, currentIndex));
      }

      lastFrameTimeRef.current = now;

      if (!isGPTMessageStreamingRef.current) {
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
