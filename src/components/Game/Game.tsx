import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ScoreBoard from '../Score/ScoreBoard';
import Guess from '../Guess/Guess';
import Price from '../Price/Price';
import { useGame } from '../../GameContext'
import { useAuth } from '../../AuthContext';

const Game: React.FC = () => {
  const navigate = useNavigate()
  const { data, setData } = useGame()
  const { token, userId, logout } = useAuth()
  const [loading, setLoading] = useState<boolean>(true)
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchGameData();
  }, []);

  const fetchGameData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}/game_status`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      })

      if (response.status === 401) {
        logout();
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Error fetching data');
      }

      const res: {score: number, can_guess: boolean, price: number, result: number, timer: number} = await response.json();
                
      if(res.can_guess === false) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(fetchGameData, 10000);
      }

      if(data.price !== res.price) {
        setData(prev => ({ ...prev, price: res.price }));
      }

      if(data.score !== res.score) {
        setData(prev => ({ ...prev, score: res.score}));
      }

      if(res.result) {
        const last_result = res.result
        let message = ''
        if(last_result > 0) {
          message = 'You won the last round!'
        }
        else {
          message = 'Oh no! You lost the last round.Try again!'
        }
        setData(prev => ({ ...prev, message: message}));
      }

      setData(prev => ({
        ...prev,
        canGuess: res.can_guess, 
        timer: res.timer,
        startTime: Date.now() 
      }));

      setLoading(false);
    } catch (err) {
      console.log('Error in fetching latest data');
      setLoading(false);
    }
  }

  return (
    <div className="App">
      <h2>Start Playing!</h2>
      {loading && <p>Loading game data...</p>}
      <ScoreBoard />
      <Price />
      <Guess fetchGameData={fetchGameData} />
    </div>
  );
};

export default Game;
