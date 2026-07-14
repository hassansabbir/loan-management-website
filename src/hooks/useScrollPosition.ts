'use client';

import { useState, useEffect } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
  direction: 'up' | 'down' | 'none';
  isAtTop: boolean;
  isAtBottom: boolean;
}

/**
 * Custom hook that tracks scroll position and direction
 * @param threshold - Minimum scroll amount to trigger direction change (default: 10)
 * @returns ScrollPosition object with x, y coordinates, scroll direction, and position indicators
 */
export function useScrollPosition(threshold: number = 10): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
    direction: 'none',
    isAtTop: true,
    isAtBottom: false,
  });

  useEffect(() => {
    let previousScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      
      // Determine scroll direction, but only if we've scrolled more than the threshold
      const direction = 
        Math.abs(currentScrollY - previousScrollY) < threshold
          ? scrollPosition.direction
          : currentScrollY > previousScrollY
            ? 'down'
            : 'up';
      
      // Check if we're at the top or bottom of the page
      const isAtTop = currentScrollY <= 0;
      const isAtBottom = 
        window.innerHeight + currentScrollY >= document.body.offsetHeight - 10;
      
      setScrollPosition({
        x: currentScrollX,
        y: currentScrollY,
        direction,
        isAtTop,
        isAtBottom,
      });
      
      previousScrollY = currentScrollY;
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Call once to initialize
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold, scrollPosition.direction]);
  
  return scrollPosition;
}

// Usage example:
// const { y, direction, isAtTop, isAtBottom } = useScrollPosition();
// if (isAtTop) { /* Do something when at the top */ }
// if (direction === 'down') { /* Hide navbar, etc. */ }