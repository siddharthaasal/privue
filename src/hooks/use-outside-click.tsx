import { useEffect } from "react";
import * as React from "react";

type AnyRef<T extends HTMLElement> =
  | React.RefObject<T | null>
  | React.MutableRefObject<T | null>;

export function useOutsideClick<T extends HTMLElement = HTMLDivElement>(
  ref: AnyRef<T>,
  callback: (event: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const el = ref.current;

    const onMouseDown = (event: MouseEvent) => {
      if (!el || el.contains(event.target as Node)) return;
      callback(event);
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!el || el.contains(event.target as Node)) return;
      callback(event);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("touchstart", onTouchStart, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("touchstart", onTouchStart);
    };
  }, [ref, callback]);
}
