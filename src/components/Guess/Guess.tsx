import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { useGame } from '../../GameContext';
import CountDownTimer from "../Timer/CountDownTimer";
import './Guess.css'

const Guess: React.FC<{fetchGameData: () => Promise<void>}> = ({ fetchGameData }) => {
  const navigate = useNavigate()
  const { data, setData } = useGame()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { token, userId, logout } = useAuth();

  const handleGuess = async (guess: 'up' | 'down') => {
    if (!guess || !data.canGuess) return;

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/bids`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ prediction: guess, price: data.price }),
      });

      if (response.status === 401) {
        logout();
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Error submitting guess');
      }

      setData(prev => ({
        ...prev,
        canGuess: false,
        timer: 60,
        startTime: Date.now()
      }));

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
  
      timeoutRef.current = setTimeout(fetchGameData, 60000);
    } catch (error) {
      console.error('Error submitting guess:', error);
    }
  };

  return (
    <div className="guess-container">
      <CountDownTimer/>
      <div className="guess-buttons">
        <button
          disabled={!data.canGuess || !data.price}
          className="guess-button up"
          onClick={() => handleGuess('up')}
        >
          ↑ Up
        </button>
        <button
          disabled={!data.canGuess || !data.price}
          className="guess-button down"
          onClick={() => handleGuess('down')}
        >
          ↓ Down
        </button>
      </div>
    </div>
  );
};

export default Guess;


