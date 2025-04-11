'use client';

import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';

export default function Game() {
  const { gameState, checkAnswer, nextRound } = useGame();
  const [feedback, setFeedback] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSelecting, setIsSelecting] = useState(true);

  useEffect(() => {
    if (gameState.currentStorybook) {
      console.log('Current storybook:', gameState.currentStorybook);
      console.log('Options:', gameState.options);
    }
  }, [gameState.currentStorybook, gameState.options]);

  const handleSelect = (selectedId: string) => {
    if (!isSelecting) return;
    
    setIsSelecting(false);
    setSelectedId(selectedId);
    const isCorrect = checkAnswer(selectedId);
    setFeedback(isCorrect ? 'Correct! 🎉' : 'Try again!');
    
    setTimeout(() => {
      setFeedback('');
      setSelectedId(null);
      setIsSelecting(true);
      nextRound();
    }, 2000);
  };

  if (gameState.isGameOver) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-4xl font-bold mb-4">Game Over!</h1>
        <p className="text-2xl mb-8">Your final score: {gameState.score}/{gameState.totalRounds}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Koan Guesser</h1>
          <p className="text-xl">Score: {gameState.score}</p>
          <p className="text-xl">Attempts: {gameState.attempts}/{gameState.totalRounds}</p>
        </div>

        {gameState.currentStorybook && (
          <div className="mb-8">
            <div className="bg-gray-100 p-6 rounded-lg mb-8">
              <p className="text-xl italic text-center whitespace-pre-line">{gameState.currentStorybook.koan}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {gameState.options.map((storybook) => {
                const isSelected = selectedId === storybook.id;
                const isCorrect = isSelected && storybook.id === gameState.currentStorybook?.id;
                const isIncorrect = isSelected && storybook.id !== gameState.currentStorybook?.id;
                
                return (
                  <button
                    key={storybook.id}
                    onClick={() => handleSelect(storybook.id)}
                    disabled={!isSelecting}
                    className={`
                      group relative aspect-video overflow-hidden rounded-lg border-2 transition-all
                      ${isSelecting ? 'border-gray-200 hover:border-blue-500' : 'border-gray-300'}
                      ${isCorrect ? 'border-green-500 ring-4 ring-green-200' : ''}
                      ${isIncorrect ? 'border-red-500 ring-4 ring-red-200' : ''}
                      ${!isSelecting && !isSelected ? 'opacity-50' : ''}
                    `}
                  >
                    <img
                      src={storybook.frames[0]}
                      alt={`Storybook ${storybook.name}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', storybook.frames[0]);
                        console.error('Error:', e);
                      }}
                    />
                    {(isCorrect || isIncorrect) && (
                      <div className={`
                        absolute inset-0 flex items-center justify-center text-4xl font-bold
                        ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}
                      `}>
                        {isCorrect ? '✓' : '✗'}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {feedback && (
          <div className={`
            fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            p-8 rounded-lg text-4xl font-bold text-white
            ${feedback.includes('Correct') ? 'bg-green-500' : 'bg-red-500'}
            animate-fade-in-out
          `}>
            {feedback}
          </div>
        )}
      </div>
    </div>
  );
} 