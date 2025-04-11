import { GameProvider } from '@/context/GameContext';
import Game from '@/components/Game';

export default function Home() {
  return (
    <GameProvider>
      <main className="min-h-screen bg-gray-50">
        <Game />
      </main>
    </GameProvider>
  );
}
