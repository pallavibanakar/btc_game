import React, { useState, useEffect } from "react";
import { useGame } from '../../GameContext';

const CountDownTimer: React.FC = () => {
  const { data } = useGame();

  const getTimeLeft = (): number => {
    if (data.canGuess || !data.startTime || !data.timer) return 0;
    const elapsed = Math.floor((Date.now() - data.startTime) / 1000);
    return Math.max(data.timer - elapsed, 0);
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    if (data.canGuess) {
      setTimeLeft(0);
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [data.startTime, data.timer, data.canGuess]);

  const formatTime = (sec: number): string => {
    const mins = String(Math.floor(sec / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="countdown-timer">
      {data.canGuess ? (
        <span>You can now make your guess!</span>
      ) : (
        <span>⏳ Time remaining: {formatTime(timeLeft)}</span>
      )}
    </div>
  );
};

export default CountDownTimer;
