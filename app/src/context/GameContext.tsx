'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Storybook {
  id: string;
  name: string;
  frames: string[];
  koan: string;
}

interface GameState {
  storybooks: Storybook[];
  currentStorybook: Storybook | null;
  options: Storybook[];
  score: number;
  attempts: number;
  isGameOver: boolean;
  totalRounds: number;
  shownStorybooks: Set<string>;
}

interface GameContextType {
  gameState: GameState;
  checkAnswer: (selectedId: string) => boolean;
  nextRound: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    storybooks: [],
    currentStorybook: null,
    options: [],
    score: 0,
    attempts: 0,
    isGameOver: false,
    totalRounds: 0,
    shownStorybooks: new Set(),
  });

  useEffect(() => {
    const loadStorybooks = async () => {
      try {
        const response = await fetch('/api/storybooks');
        const data = await response.json();
        if (data.storybooks) {
          setGameState(prev => ({
            ...prev,
            storybooks: data.storybooks,
            totalRounds: data.storybooks.length,
            shownStorybooks: new Set(),
          }));
        }
      } catch (error) {
        console.error('Error loading storybooks:', error);
      }
    };

    loadStorybooks();
  }, []);

  const getRandomOptions = (currentId: string | null = null) => {
    const availableStorybooks = gameState.storybooks.filter(
      storybook => storybook.id !== currentId && !gameState.shownStorybooks.has(storybook.id)
    );
    
    const shuffled = [...availableStorybooks].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  };

  const checkAnswer = (selectedId: string): boolean => {
    const isCorrect = selectedId === gameState.currentStorybook?.id;
    if (gameState.currentStorybook) {
      setGameState(prev => {
        if (!prev.currentStorybook) return prev;
        return {
          ...prev,
          score: isCorrect ? prev.score + 1 : prev.score,
          attempts: prev.attempts + 1,
          shownStorybooks: new Set(prev.shownStorybooks).add(prev.currentStorybook.id),
          isGameOver: prev.attempts + 1 >= prev.totalRounds,
        };
      });
    }
    return isCorrect;
  };

  const nextRound = () => {
    if (gameState.attempts >= gameState.totalRounds) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
      return;
    }

    const availableStorybooks = gameState.storybooks.filter(
      storybook => !gameState.shownStorybooks.has(storybook.id)
    );

    if (availableStorybooks.length === 0) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableStorybooks.length);
    const newStorybook = availableStorybooks[randomIndex];
    const newOptions = getRandomOptions(newStorybook.id);

    setGameState(prev => ({
      ...prev,
      currentStorybook: newStorybook,
      options: [...newOptions, newStorybook].sort(() => Math.random() - 0.5),
    }));
  };

  useEffect(() => {
    if (gameState.storybooks.length > 0 && !gameState.currentStorybook) {
      nextRound();
    }
  }, [gameState.storybooks]);

  return (
    <GameContext.Provider value={{ gameState, checkAnswer, nextRound }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
} 