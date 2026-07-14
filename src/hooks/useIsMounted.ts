"use client";

import { useEffect, useState } from "react";

/**
 * Hook to check if a component is mounted
 * Useful for handling hydration issues or safe state updates
 */
export function useIsMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return mounted;
}
