import React from 'react';
import AnnouncementBanner from './AnnouncementBanner';
import GameSelector from './GameSelector';
import SlotBooking from './SlotBooking';
import ChatboxButton from './ChatboxButton';

export default function UserDashboard() {
  const [selectedGame, setSelectedGame] = React.useState<string | null>(null);
  const [selectedMode, setSelectedMode] = React.useState<'solo' | 'duo' | 'squad'>('solo');

  return (
    <div className="min-h-screen bg-gray-900 pt-16">
      <AnnouncementBanner />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-2">Welcome back, Player!</h1>
          <p className="text-gray-400">Ready to join your next tournament?</p>
        </div>

        <GameSelector 
          selectedGame={selectedGame} 
          onGameSelect={setSelectedGame} 
        />

        {selectedGame && (
          <SlotBooking 
            gameId={selectedGame}
            selectedMode={selectedMode}
            onModeChange={setSelectedMode}
          />
        )}
      </main>

      <ChatboxButton unreadCount={3} />
    </div>
  );
}