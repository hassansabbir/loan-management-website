"use client";

import { useEffect, useRef, RefObject } from "react";

/**
 * Hook that detects clicks outside of the specified element
 * @param handler - Callback function to run when a click outside is detected
 * @returns React ref to attach to the element
 */
export function useClickOutside<T extends HTMLElement = HTMLElement>(
  handler: (event: MouseEvent | TouchEvent) => void
): RefObject<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);

  return ref as RefObject<T>;
}

// Usage example:
// const dropdownRef = useClickOutside(() => setIsOpen(false));
// <div ref={dropdownRef}>Dropdown Content</div>
