import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { ChatBox } from '../components/chat/ChatBox';
import { GameChatSection } from '../components/chat/GameChatSection';
import { useChat } from '../context/ChatContext';

export const AdminChat = () => {
  const { games, slots } = useAdmin();
  const { activeChatId, setActiveChatId } = useChat();

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex-1 flex overflow-hidden">
        <div className={`${activeChatId ? 'hidden md:flex' : 'flex'} flex-col flex-1 p-4`}>
          <h1 className="text-2xl font-bold mb-6">Chat Management</h1>
          
          <div className="space-y-6 overflow-y-auto">
            {games.map(game => (
              <GameChatSection
                key={game.id}
                game={game}
                slots={slots.filter(s => s.gameId === game.id)}
                onChatOpen={setActiveChatId}
              />
            ))}
          </div>
        </div>

        {activeChatId && (
          <div className="fixed inset-0 md:relative md:flex-1 bg-gray-800">
            <ChatBox
              slotId={activeChatId}
              onClose={() => setActiveChatId(null)}
              isAdmin
            />
          </div>
        )}
      </div>
    </div>
  );
};