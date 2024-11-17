import React, { useState } from 'react';
import { X } from 'lucide-react';

interface GameFormProps {
  onSubmit: (data: { name: string; icon: string }) => void;
  onClose: () => void;
}

export const GameForm = ({ onSubmit, onClose }: GameFormProps) => {
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, icon });
    setName('');
    setIcon('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Add New Game</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">
              Game Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input w-full"
              placeholder="Enter game name"
              required
            />
          </div>

          <div>
            <label htmlFor="icon" className="block text-sm font-medium text-gray-400 mb-2">
              Game Icon URL
            </label>
            <input
              type="url"
              id="icon"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="input w-full"
              placeholder="Enter icon URL"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={!name || !icon}
          >
            Add Game
          </button>
        </form>
      </div>
    </div>
  );
};