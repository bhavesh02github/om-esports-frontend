import React, { useState } from 'react';
import { ChevronDown, ChevronRight, MessageSquare } from 'lucide-react';
import { Game, Slot } from '../../../types';

interface GameChatSectionProps {
  game: Game;
  slots: Slot[];
  onChatOpen: (slotId: string) => void;
}

export const GameChatSection = ({ game, slots, onChatOpen }: GameChatSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="card">
      <button
        className="w-full flex items-center justify-between p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-3">
          {isExpanded ? (
            <ChevronDown className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
          <h2 className="text-xl font-semibold">{game.name}</h2>
          <span className="text-sm text-gray-400">
            ({slots.length} {slots.length === 1 ? 'slot' : 'slots'})
          </span>
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          {slots.map(slot => (
            <div
              key={slot.id}
              className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg"
            >
              <div>
                <p className="font-medium">{slot.time}</p>
                <p className="text-sm text-gray-400">
                  Duration: {slot.duration} minutes
                </p>
              </div>
              <button
                onClick={() => onChatOpen(slot.id)}
                className="p-2 text-purple-400 hover:bg-purple-400/20 rounded-lg transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          ))}

          {slots.length === 0 && (
            <p className="text-center text-gray-400 py-4">
              No slots available for this game.
            </p>
          )}
        </div>
      )}
    </div>
  );
};