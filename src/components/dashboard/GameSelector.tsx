import React from 'react';
import { ChevronDown, Gamepad2 } from 'lucide-react';
import type { Game } from '../../types';

const games: Game[] = [
  {
    id: 'bgmi',
    name: 'BGMI',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    slots: 100,
    active: true
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    slots: 80,
    active: true
  },
  {
    id: 'codm',
    name: 'Call of Duty Mobile',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    slots: 60,
    active: true
  }
];

interface GameSelectorProps {
  selectedGame: string | null;
  onGameSelect: (gameId: string) => void;
}

export default function GameSelector({ selectedGame, onGameSelect }: GameSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedGameData = games.find(game => game.id === selectedGame);

  return (
    <div className="mb-8">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full sm:w-auto flex items-center justify-between gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
        >
          <div className="flex items-center gap-2">
            <Gamepad2 className="h-5 w-5 text-indigo-500" />
            <span>{selectedGameData ? selectedGameData.name : 'Select Game'}</span>
          </div>
          <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full sm:w-64 mt-2 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => {
                    onGameSelect(game.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 focus:outline-none focus:bg-gray-700 ${
                    selectedGame === game.id ? 'bg-gray-700 text-white' : 'text-gray-300'
                  }`}
                  role="menuitem"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={game.image}
                      alt={game.name}
                      className="h-8 w-8 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">{game.name}</p>
                      <p className="text-xs text-gray-400">{game.slots} slots available</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onGameSelect(game.id)}
            className={`relative group rounded-lg overflow-hidden aspect-square focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 ${
              selectedGame === game.id ? 'ring-2 ring-indigo-500' : ''
            }`}
          >
            <img
              src={game.image}
              alt={game.name}
              className="w-full h-full object-cover transition-transform group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-medium text-sm">{game.name}</p>
              <p className="text-gray-300 text-xs">{game.slots} slots</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}