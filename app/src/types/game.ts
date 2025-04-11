export interface Storybook {
  id: string;
  name: string;
  frames: string[];
  koan: string;
}

export interface GameState {
  currentStorybook: Storybook | null;
  score: number;
  attempts: number;
  isGameOver: boolean;
  options: Storybook[];
}

export interface GameContextType {
  gameState: GameState;
  setGameState: (state: GameState) => void;
  checkAnswer: (selectedId: string) => boolean;
  nextRound: () => void;
} 