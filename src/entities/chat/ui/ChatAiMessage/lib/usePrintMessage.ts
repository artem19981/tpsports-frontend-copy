import { useEffect, useRef, useState } from 'react';

const THRESHOLDS = {
  10: 2,
  13: 4,
  16: 5,
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

      let charsPerFrame = 2;
      for (const [threshold, chars] of Object.entries(THRESHOLDS)) {
        if (timeSinceLastFrame <= Number(threshold)) {
          charsPerFrame = chars;
          break;
        }
      }

      const isMessageLoaded = messageRef.current.length !== currentIndex;

      if (isMessageLoaded) {
        currentIndex += charsPerFrame;

        setDisplayedText(messageRef.current.slice(0, currentIndex));
      }

      lastFrameTimeRef.current = now;

      frameId = requestAnimationFrame(printNextChar);

      if (!isGPTMessageStreamingRef.current) {
        cancelAnimationFrame(frameId);
        onEndPrint();
      }
    };

    printNextChar();

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [withAnimation, onEndPrint]);

  return displayedText;
};
