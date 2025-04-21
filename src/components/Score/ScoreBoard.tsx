import React, { useEffect, useState } from 'react';
import { useGame } from '../../GameContext';
import './ScoreBoard.css'

const ScoreBoard: React.FC = () => {
  const { data } = useGame();
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (data.canGuess && data.message) {
      setShowMessage(true);
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [data.canGuess, data.message]);

  return (
    <div>
      {showMessage && data.message && (
        <div className="alert-message">{data.message}</div>
      )}
      <h2>Your Score</h2>
      <p className="score">{data.score}</p>
    </div>
  );
};

export default ScoreBoard;
