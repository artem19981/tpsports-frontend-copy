import { useEffect, useRef, useState } from 'react';

const THRESHOLDS = {
  10: 3,
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
  const [displayedText, setDisplayedText] = useState(
    withAnimation ? '' : messageText
  );

  const messageRef = useRef(messageText);
  const lastFrameTimeRef = useRef<number>(performance.now());

  useEffect(() => {
    messageRef.current = messageText;
  }, [messageText]);

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

      let charsPerFrame = 3;
      for (const [threshold, chars] of Object.entries(THRESHOLDS)) {
        if (timeSinceLastFrame <= Number(threshold)) {
          charsPerFrame = chars;
          break;
        }
      }

      console.log(timeSinceLastFrame, charsPerFrame, 'charsPerFrame');

      currentIndex += charsPerFrame;
      setDisplayedText(messageRef.current.slice(0, currentIndex));
      lastFrameTimeRef.current = now;

      if (currentIndex < messageRef.current.length) {
        frameId = requestAnimationFrame(printNextChar);
      } else if (!isGPTMessageStreaming) {
        onEndPrint();
      }
    };

    frameId = requestAnimationFrame(printNextChar);

    return () => cancelAnimationFrame(frameId);
  }, [withAnimation, isGPTMessageStreaming, onEndPrint]);

  return displayedText;
};
