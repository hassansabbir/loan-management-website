"use client";

import { useRef, useEffect, useState } from "react";
import { easings } from "@/utils/animations";

type EasingFunction = (t: number) => number;
type AnimationCallback = (value: number) => void;

interface AnimationOptions {
  duration?: number;
  easing?: EasingFunction;
  delay?: number;
  autoPlay?: boolean;
  onComplete?: () => void;
}

interface AnimationControls {
  play: () => void;
  pause: () => void;
  reset: () => void;
  reverse: () => void;
  seek: (progress: number) => void;
  isPlaying: boolean;
  progress: number;
}

/**
 * Hook for creating and controlling animations
 * @param start - Start value
 * @param end - End value
 * @param callback - Callback function with current value
 * @param options - Animation options
 * @returns Animation controls
 */
export function useAnimation(
  start: number,
  end: number,
  callback: AnimationCallback,
  options: AnimationOptions = {}
): AnimationControls {
  const {
    duration = 1000,
    easing = easings.easeOutCubic,
    delay = 0,
    autoPlay = true,
    onComplete,
  } = options;

  const [isPlaying, setIsPlaying] = useState<boolean>(autoPlay);
  const [progress, setProgress] = useState<number>(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);
  const pausedTimeRef = useRef<number | undefined>(undefined);

  const animate = (time: number) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = time;
    }

    const elapsed = time - startTimeRef.current;

    if (elapsed < delay) {
      requestRef.current = requestAnimationFrame(animate);
      return;
    }

    const adjustedElapsed = elapsed - delay;
    const newProgress = Math.min(adjustedElapsed / duration, 1);
    setProgress(newProgress);

    const easedProgress =
      direction === 1 ? easing(newProgress) : 1 - easing(1 - newProgress);

    const currentValue = start + (end - start) * easedProgress;
    callback(currentValue);

    if (newProgress < 1) {
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
      if (onComplete) {
        onComplete();
      }
    }
  };

  // Start or stop animation based on isPlaying state
  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = pausedTimeRef.current
        ? performance.now() - progress * duration - delay
        : undefined;
      requestRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isPlaying, direction]);

  // Animation controls
  const play = () => {
    if (!isPlaying) {
      pausedTimeRef.current = performance.now();
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    }
  };

  const reset = () => {
    setIsPlaying(false);
    setProgress(0);
    startTimeRef.current = undefined;
    pausedTimeRef.current = undefined;
    callback(start);
  };

  const reverse = () => {
    setDirection((prev) => (prev === 1 ? -1 : 1));
    startTimeRef.current =
      performance.now() - (1 - progress) * duration - delay;
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const seek = (newProgress: number) => {
    const clampedProgress = Math.max(0, Math.min(1, newProgress));
    setProgress(clampedProgress);

    const easedProgress =
      direction === 1
        ? easing(clampedProgress)
        : 1 - easing(1 - clampedProgress);

    const currentValue = start + (end - start) * easedProgress;
    callback(currentValue);

    startTimeRef.current =
      performance.now() - clampedProgress * duration - delay;
  };

  return {
    play,
    pause,
    reset,
    reverse,
    seek,
    isPlaying,
    progress,
  };
}

// Usage example:
// const animateOpacity = (value) => { element.style.opacity = value; };
// const controls = useAnimation(0, 1, animateOpacity, { duration: 500 });
// controls.play();
