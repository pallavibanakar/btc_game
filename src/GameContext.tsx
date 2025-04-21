import React, { createContext, useContext, useState, ReactNode } from 'react';
import { GameData } from './types/GameData'

interface GameContextType {
  data: GameData;
  setData: React.Dispatch<React.SetStateAction<GameData>>;
}

const defaultData: GameData = {
  price: 0,
  score: 0,
  canGuess: true,
  timer: 0,
  message: ''
};

export const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<GameData>(defaultData);

  return (
    <GameContext.Provider value={{ data, setData }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
