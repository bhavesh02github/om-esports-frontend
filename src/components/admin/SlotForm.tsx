import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Game } from '../types';

interface SlotFormProps {
  games: Game[];
  onSubmit: (data: {
    gameId: string;
    time: string;
    duration: number;
    types: ('solo' | 'duo' | 'squad')[];
    prices: {
      solo?: number;
      duo?: number;
      squad?: number;
    };
  }) => void;
  onClose: () => void;
}

export const SlotForm = ({ games, onSubmit, onClose }: SlotFormProps) => {
  const [gameId, setGameId] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(30);
  const [selectedTypes, setSelectedTypes] = useState<('solo' | 'duo' | 'squad')[]>([]);
  const [prices, setPrices] = useState<{ [key: string]: number }>({});

  const handleTypeToggle = (type: 'solo' | 'duo' | 'squad') => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredPrices = Object.fromEntries(
      Object.entries(prices).filter(([key]) => selectedTypes.includes(key as any))
    );
    onSubmit({
      gameId,
      time,
      duration,
      types: selectedTypes,
      prices: filteredPrices,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Slot</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="game" className="block text-sm font-medium text-gray-400 mb-2">
              Select Game
            </label>
            <select
              id="game"
              value={gameId}
              onChange={(e) => setGameId(e.target.value)}
              className="input w-full"
              required
            >
              <option value="">Select a game</option>
              {games.map(game => (
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="time" className="block text-sm font-medium text-gray-400 mb-2">
              Start Time
            </label>
            <input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="input w-full"
              required
            />
          </div>

          <div>
            <label htmlFor="duration" className="block text-sm font-medium text-gray-400 mb-2">
              Duration (minutes)
            </label>
            <input
              type="number"
              id="duration"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              min="15"
              step="15"
              className="input w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Slot Types
            </label>
            <div className="flex gap-4">
              {(['solo', 'duo', 'squad'] as const).map(type => (
                <label
                  key={type}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeToggle(type)}
                    className="form-checkbox"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {selectedTypes.map(type => (
            <div key={type}>
              <label
                htmlFor={`price-${type}`}
                className="block text-sm font-medium text-gray-400 mb-2 capitalize"
              >
                {type} Price ($)
              </label>
              <input
                type="number"
                id={`price-${type}`}
                value={prices[type] || ''}
                onChange={(e) => setPrices(prev => ({
                  ...prev,
                  [type]: Number(e.target.value)
                }))}
                min="0"
                step="0.01"
                className="input w-full"
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!gameId || !time || selectedTypes.length === 0}
          >
            Add Slot
          </button>
        </form>
      </div>
    </div>
  );
};