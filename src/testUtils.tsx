import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { GameContext } from './GameContext';
import { GameData } from './types/GameData';

export const renderWithContext = (
  ui: React.ReactNode,
  { data = { canGuess: true, price: 1000, score: 0, timer: 0 }, token = 'fake-token', userId = 1, loading = false, setData = jest.fn() }:
  { data?: GameData; token?: string; userId?: number, loading?: boolean, setData?: any }
) => {
  return render(
    <MemoryRouter>
      <AuthContext.Provider
        value={{
          token,
          userId,
          login: jest.fn(),
          logout: jest.fn(),
          setUserId: jest.fn(),
        }}
      >
        <GameContext.Provider value={{ data, setData }}>
          {ui}
        </GameContext.Provider>
      </AuthContext.Provider>
    </MemoryRouter>
  );
};