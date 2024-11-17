import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ChatBox } from '../components/chat/ChatBox';
import { GameSelect } from '../components/chat/GameSelect';
import { SlotCard } from '../components/chat/SlotCard';
import { useChat } from '../context/ChatContext';

export const UserChat = () => {
  const { games, slots } = useAdmin();
  const { activeChatId, setActiveChatId } = useChat();
  const [selectedGameId, setSelectedGameId] = useState<string>('');
  
  // Filter slots for selected game
  const gameSlots = slots.filter(slot => slot.gameId === selectedGameId);

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-none p-4 border-b border-gray-700">
        <GameSelect
          games={games}
          selectedGameId={selectedGameId}
          onSelect={setSelectedGameId}
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className={`${activeChatId ? 'hidden md:flex' : 'flex'} flex-col flex-1 p-4`}>
          {selectedGameId ? (
            gameSlots.length > 0 ? (
              <div className="grid gap-4 auto-rows-max overflow-y-auto">
                {gameSlots.map(slot => (
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    game={games.find(g => g.id === slot.gameId)!}
                    onChatOpen={() => setActiveChatId(slot.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                No slots booked for this game.
              </div>
            )
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a game to view your booked slots.
            </div>
          )}
        </div>

        {activeChatId && (
          <div className="fixed inset-0 md:relative md:flex-1 bg-gray-800">
            <ChatBox
              slotId={activeChatId}
              onClose={() => setActiveChatId(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
};