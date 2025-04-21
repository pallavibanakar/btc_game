import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Price.css'
import { useGame } from '../../GameContext'
import { useAuth } from '../../AuthContext'

const Price: React.FC = () => {
  const navigate = useNavigate()
  const {data, setData } = useGame()
  const [loading, setLoading] = useState<boolean>(false)
  const { token, logout } = useAuth()

  useEffect(() => {
    const priceInterval = setInterval(fetchPrice, 30000);

    return () => clearInterval(priceInterval);
  }, []);

  const fetchPrice = async () => {
    setLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/prices`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        }
      });

      if (response.status === 401) {
        logout();
        navigate('/login');
        return;
      }

      if (!response.ok) {
        throw new Error('Error fetching latest price');
      }

      const res: { price: number } = await response.json();
      if(data.price !== res.price) {
        setData(prev => ({ ...prev, price: res.price }));
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('Error in fetching price data');
    }
  }

  return (
    <div className="price-container">
      <h3>Current BTC Price</h3>
      {(loading || !data.price) ? (<p>Please wait for latest price</p>) : (<div className="price-value">${data.price}</div>)}
    </div>
  );
};

export default Price;
