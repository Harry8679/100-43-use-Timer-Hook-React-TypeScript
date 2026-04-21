import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTimerOptions {
  initialTime?: number;
  interval?: number;
  autoStart?: boolean;
  countDown?: boolean;
  onComplete?: () => void;
  onTick?: (time: number) => void;
}

interface UseTimerReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  pause: () => void;
  reset: () => void;
  toggle: () => void;
  setTime: (time: number) => void;
}

export const useTimer = (options: UseTimerOptions = {}): UseTimerReturn => {
  const {
    initialTime = 0,
    interval = 1000,
    autoStart = false,
    countDown = false,
    onComplete,
    onTick,
  } = options;

  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(autoStart);
  const intervalRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);
  const onTickRef = useRef(onTick);

  // Keep refs up to date
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onTickRef.current = onTick;
  }, [onComplete, onTick]);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTime(initialTime);
  }, [initialTime]);

  const toggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const updateTime = useCallback((newTime: number) => {
    setTime(newTime);
  }, []);

  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setTime((prevTime) => {
        const newTime = countDown ? prevTime - 1 : prevTime + 1;

        // Call onTick callback
        if (onTickRef.current) {
          onTickRef.current(newTime);
        }

        // Check if countdown reached 0
        if (countDown && newTime <= 0) {
          setIsRunning(false);
          if (onCompleteRef.current) {
            onCompleteRef.current();
          }
          return 0;
        }

        return newTime;
      });
    }, interval);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, interval, countDown]);

  return {
    time,
    isRunning,
    start,
    pause,
    reset,
    toggle,
    setTime: updateTime,
  };
};