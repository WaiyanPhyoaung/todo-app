import { useCallback, useRef } from "react";

function useDebounced<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timeoutRef.current!);
      timeoutRef.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );
}

export default useDebounced;
