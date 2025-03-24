import { MutableRefObject, Ref } from 'react';

export const mergeRefs =
  <T>(...refs: Ref<T | null>[]) =>
  (node: T | null) => {
    refs.forEach((ref) => {
      if (!ref) return;
      if (typeof ref === 'function') {
        ref(node);
      } else if ('current' in ref) {
        (ref as MutableRefObject<T | null>).current = node;
      }
    });
  };
