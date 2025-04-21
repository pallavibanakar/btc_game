import React from 'react';
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  return (
    <header className="header">
      <div className="header-title">BTC Game</div>
      <nav className="header-nav">
        {token && (
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
