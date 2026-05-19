import { useState, useEffect } from "react";

export function usePomodoro() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState("focus"); // 'focus' | 'break'

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Automatically switch modes
      if (mode === "focus") {
        setMode("break");
        setTimeLeft(5 * 60);
      } else {
        setMode("focus");
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(mode === "focus" ? 25 * 60 : 5 * 60);
  };

  const setFocusMode = () => {
    setIsActive(false);
    setMode("focus");
    setTimeLeft(25 * 60);
  };

  const setBreakMode = () => {
    setIsActive(false);
    setMode("break");
    setTimeLeft(5 * 60);
  };

  return { timeLeft, isActive, mode, toggleTimer, resetTimer, setFocusMode, setBreakMode };
}
