import { useEffect, useRef } from "react";

/**
 * Calls `onSave(values)` 2s after the last change to `values`.
 * Skips the very first render so loading defaults doesn't trigger a save.
 */
export function useDebouncedSave<T>(
  values: T,
  onSave: (values: T) => void | Promise<void>,
  delay = 2000,
  enabled = true,
) {
  const firstRun = useRef(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!enabled) return;
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onSave(values);
    }, delay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, enabled]);
}