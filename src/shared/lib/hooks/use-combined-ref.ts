import { MutableRefObject, RefCallback, useCallback } from 'react';

// in original Ref type we have readonly current field
type Ref<T> = MutableRefObject<T> | RefCallback<T> | undefined | null;

export function useCombinedRef<T extends HTMLElement>(...refs: Ref<T | null>[]) {
  return useCallback((element: T | null) => {
    refs.forEach((ref) => {
      if (!ref) {
        return;
      }

      if (typeof ref === 'function') {
        ref(element);
      } else {
        ref.current = element;
      }
    });
  }, refs);
}
