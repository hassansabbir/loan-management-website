'use client';

/**
 * Animation utility functions for smooth transitions and effects
 */

// Easing functions
export const easings = {
  // Linear
  linear: (t: number): number => t,
  
  // Quadratic
  easeInQuad: (t: number): number => t * t,
  easeOutQuad: (t: number): number => t * (2 - t),
  easeInOutQuad: (t: number): number => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  
  // Cubic
  easeInCubic: (t: number): number => t * t * t,
  easeOutCubic: (t: number): number => (--t) * t * t + 1,
  easeInOutCubic: (t: number): number => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  
  // Elastic
  easeInElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : -Math.pow(2, 10 * t - 10) * Math.sin((t * 10 - 10.75) * c4);
  },
  easeOutElastic: (t: number): number => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

/**
 * Animate a value from start to end
 * @param start - Start value
 * @param end - End value
 * @param duration - Duration in milliseconds
 * @param easing - Easing function (default: linear)
 * @param callback - Callback function with current value
 * @returns Promise that resolves when animation is complete
 */
export function animateValue(
  start: number,
  end: number,
  duration: number,
  easing: (t: number) => number = easings.linear,
  callback: (value: number) => void
): Promise<void> {
  return new Promise((resolve) => {
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easedProgress = easing(progress);
      const currentValue = start + (end - start) * easedProgress;
      
      callback(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };
    
    requestAnimationFrame(animate);
  });
}

/**
 * Scroll to an element smoothly
 * @param element - Element to scroll to
 * @param duration - Duration in milliseconds (default: 500)
 * @param offset - Offset from the top (default: 0)
 * @param easing - Easing function (default: easeInOutCubic)
 * @returns Promise that resolves when scrolling is complete
 */
export function scrollToElement(
  element: HTMLElement,
  duration: number = 500,
  offset: number = 0,
  easing: (t: number) => number = easings.easeInOutCubic
): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }
    
    const start = window.scrollY || window.pageYOffset;
    const elementTop = element.getBoundingClientRect().top + start;
    const targetPosition = elementTop - offset;
    
    animateValue(start, targetPosition, duration, easing, (value) => {
      window.scrollTo(0, value);
    }).then(resolve);
  });
}

/**
 * Fade in an element
 * @param element - Element to fade in
 * @param duration - Duration in milliseconds (default: 300)
 * @param easing - Easing function (default: easeOutCubic)
 * @returns Promise that resolves when animation is complete
 */
export function fadeIn(
  element: HTMLElement,
  duration: number = 300,
  easing: (t: number) => number = easings.easeOutCubic
): Promise<void> {
  element.style.opacity = '0';
  element.style.display = 'block';
  
  return animateValue(0, 1, duration, easing, (value) => {
    element.style.opacity = value.toString();
  });
}

/**
 * Fade out an element
 * @param element - Element to fade out
 * @param duration - Duration in milliseconds (default: 300)
 * @param easing - Easing function (default: easeInCubic)
 * @returns Promise that resolves when animation is complete
 */
export function fadeOut(
  element: HTMLElement,
  duration: number = 300,
  easing: (t: number) => number = easings.easeInCubic
): Promise<void> {
  return animateValue(1, 0, duration, easing, (value) => {
    element.style.opacity = value.toString();
  }).then(() => {
    element.style.display = 'none';
  });
}

/**
 * Slide down an element (expand height)
 * @param element - Element to slide down
 * @param duration - Duration in milliseconds (default: 300)
 * @param easing - Easing function (default: easeOutCubic)
 * @returns Promise that resolves when animation is complete
 */
export function slideDown(
  element: HTMLElement,
  duration: number = 300,
  easing: (t: number) => number = easings.easeOutCubic
): Promise<void> {
  // Store original styles
  const originalHeight = element.offsetHeight;
  const originalDisplay = element.style.display;
  
  // Set initial state
  element.style.overflow = 'hidden';
  element.style.height = '0px';
  element.style.display = 'block';
  element.style.paddingTop = '0';
  element.style.paddingBottom = '0';
  element.style.marginTop = '0';
  element.style.marginBottom = '0';
  
  // Get target height
  const targetHeight = originalHeight || element.scrollHeight;
  
  return animateValue(0, targetHeight, duration, easing, (value) => {
    element.style.height = `${value}px`;
    
    // Animate padding and margin proportionally
    const progress = value / targetHeight;
    if (originalDisplay !== 'none') {
      const computedStyle = window.getComputedStyle(element);
      const paddingTop = parseFloat(computedStyle.paddingTop) * progress;
      const paddingBottom = parseFloat(computedStyle.paddingBottom) * progress;
      const marginTop = parseFloat(computedStyle.marginTop) * progress;
      const marginBottom = parseFloat(computedStyle.marginBottom) * progress;
      
      element.style.paddingTop = `${paddingTop}px`;
      element.style.paddingBottom = `${paddingBottom}px`;
      element.style.marginTop = `${marginTop}px`;
      element.style.marginBottom = `${marginBottom}px`;
    }
  }).then(() => {
    // Restore original styles
    element.style.height = '';
    element.style.overflow = '';
    element.style.paddingTop = '';
    element.style.paddingBottom = '';
    element.style.marginTop = '';
    element.style.marginBottom = '';
  });
}

/**
 * Slide up an element (collapse height)
 * @param element - Element to slide up
 * @param duration - Duration in milliseconds (default: 300)
 * @param easing - Easing function (default: easeInCubic)
 * @returns Promise that resolves when animation is complete
 */
export function slideUp(
  element: HTMLElement,
  duration: number = 300,
  easing: (t: number) => number = easings.easeInCubic
): Promise<void> {
  // Store original styles
  const originalHeight = element.offsetHeight;
  
  // Set initial state
  element.style.overflow = 'hidden';
  element.style.height = `${originalHeight}px`;
  
  const computedStyle = window.getComputedStyle(element);
  const paddingTop = parseFloat(computedStyle.paddingTop);
  const paddingBottom = parseFloat(computedStyle.paddingBottom);
  const marginTop = parseFloat(computedStyle.marginTop);
  const marginBottom = parseFloat(computedStyle.marginBottom);
  
  return animateValue(originalHeight, 0, duration, easing, (value) => {
    element.style.height = `${value}px`;
    
    // Animate padding and margin proportionally
    const progress = value / originalHeight;
    element.style.paddingTop = `${paddingTop * progress}px`;
    element.style.paddingBottom = `${paddingBottom * progress}px`;
    element.style.marginTop = `${marginTop * progress}px`;
    element.style.marginBottom = `${marginBottom * progress}px`;
  }).then(() => {
    element.style.display = 'none';
    
    // Restore original styles
    element.style.height = '';
    element.style.overflow = '';
    element.style.paddingTop = '';
    element.style.paddingBottom = '';
    element.style.marginTop = '';
    element.style.marginBottom = '';
  });
}