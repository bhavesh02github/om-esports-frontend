import React from 'react';
import { MessageSquare } from 'lucide-react';
import { Game, Slot } from '../../../types';

interface SlotCardProps {
  slot: Slot;
  game: Game;
  onChatOpen: () => void;
}

export const SlotCard = ({ slot, game, onChatOpen }: SlotCardProps) => {
  const getSlotTypes = () => {
    const types = [];
    if (slot.prices.solo) types.push('Solo');
    if (slot.prices.duo) types.push('Duo');
    if (slot.prices.squad) types.push('Squad');
    return types.join(', ');
  };

  return (
    <div className="card hover:bg-gray-700/50 transition-colors cursor-pointer" onClick={onChatOpen}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{game.name}</h3>
          <p className="text-gray-400">{slot.time}</p>
          <p className="text-sm text-gray-400">{getSlotTypes()}</p>
        </div>
        <button className="p-2 text-purple-400 hover:bg-purple-400/20 rounded-lg transition-colors">
          <MessageSquare className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};