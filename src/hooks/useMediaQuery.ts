'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for responsive design that detects if a media query matches
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns boolean indicating if the media query matches
 */
export function useMediaQuery(query: string): boolean {
  // Initialize with a default value for SSR
  const [matches, setMatches] = useState<boolean>(false);

  // Set up the listener and initial state
  useEffect(() => {
    // Avoid running on SSR
    if (typeof window === 'undefined') return undefined;

    // Function to get the current match state
    const updateMatches = () => {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);
    };

    // Set initial value
    updateMatches();

    // Create event listener
    const mediaQuery = window.matchMedia(query);
    
    // Define callback for media query changes
    const handleChange = () => {
      updateMatches();
    };

    // Add event listener with compatibility check
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Clean up with compatibility check
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]); // Only re-run if the query changes

  return matches;
}

// Common media query breakpoints
export const breakpoints = {
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
  '2xl': '(min-width: 1536px)',
};

// Usage examples:
// const isMobile = useMediaQuery('(max-width: 768px)');
// const isDesktop = useMediaQuery(breakpoints.lg);