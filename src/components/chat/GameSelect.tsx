import React from 'react';
import { Game } from '../../../types';

interface GameSelectProps {
  games: Game[];
  selectedGameId: string;
  onSelect: (gameId: string) => void;
}

export const GameSelect = ({ games, selectedGameId, onSelect }: GameSelectProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="game-select" className="block text-sm font-medium text-gray-400">
        Select Game
      </label>
      <select
        id="game-select"
        value={selectedGameId}
        onChange={(e) => onSelect(e.target.value)}
        className="input w-full"
      >
        <option value="">Choose a game</option>
        {games.map(game => (
          <option key={game.id} value={game.id}>
            {game.name}
          </option>
        ))}
      </select>
    </div>
  );
};