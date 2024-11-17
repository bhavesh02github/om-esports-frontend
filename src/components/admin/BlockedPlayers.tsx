import React from 'react';
import { Ban, CheckCircle } from 'lucide-react';
import { Player } from '../types';

interface BlockedPlayersProps {
  players: Player[];
  onUnblock: (playerId: string) => void;
}

export const BlockedPlayers = ({ players, onUnblock }: BlockedPlayersProps) => {
  const blockedPlayers = players.filter(player => player.isBlocked);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Blocked Players</h2>
      
      {blockedPlayers.length === 0 ? (
        <p className="text-gray-400">No blocked players.</p>
      ) : (
        <div className="grid gap-4">
          {blockedPlayers.map(player => (
            <div
              key={player.id}
              className="card flex items-center justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold">{player.name}</h3>
                <p className="text-gray-400">@{player.username}</p>
                {player.email && (
                  <p className="text-sm text-gray-400">{player.email}</p>
                )}
              </div>
              
              <button
                onClick={() => onUnblock(player.id)}
                className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors"
                title="Unblock player"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};