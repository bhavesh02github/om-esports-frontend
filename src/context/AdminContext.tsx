import React, { createContext, useContext, useState } from 'react';

interface Game {
  id: string;
  name: string;
  icon: string;
}

interface Slot {
  id: string;
  gameId: string;
  time: string;
  maxBookings: number;
  prices: {
    solo: number;
    duo: number;
    squad: number;
  };
}

interface Player {
  id: string;
  name: string;
  username: string;
  gameId: string;
  isBlocked: boolean;
}

interface Report {
  id: string;
  playerId: string;
  gameId: string;
  slotTime: string;
  message: string;
  screenshot?: string;
  isReviewed: boolean;
}

interface AdminContextType {
  games: Game[];
  slots: Slot[];
  players: Player[];
  reports: Report[];
  addGame: (game: Omit<Game, 'id'>) => void;
  deleteGame: (id: string) => void;
  addSlot: (slot: Omit<Slot, 'id'>) => void;
  deleteSlot: (id: string) => void;
  togglePlayerBlock: (id: string) => void;
  markReportAsReviewed: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [reports, setReports] = useState<Report[]>([]);

  const addGame = (game: Omit<Game, 'id'>) => {
    setGames(prev => [...prev, { ...game, id: crypto.randomUUID() }]);
  };

  const deleteGame = (id: string) => {
    setGames(prev => prev.filter(game => game.id !== id));
  };

  const addSlot = (slot: Omit<Slot, 'id'>) => {
    setSlots(prev => [...prev, { ...slot, id: crypto.randomUUID() }]);
  };

  const deleteSlot = (id: string) => {
    setSlots(prev => prev.filter(slot => slot.id !== id));
  };

  const togglePlayerBlock = (id: string) => {
    setPlayers(prev =>
      prev.map(player =>
        player.id === id
          ? { ...player, isBlocked: !player.isBlocked }
          : player
      )
    );
  };

  const markReportAsReviewed = (id: string) => {
    setReports(prev =>
      prev.map(report =>
        report.id === id
          ? { ...report, isReviewed: true }
          : report
      )
    );
  };

  return (
    <AdminContext.Provider
      value={{
        games,
        slots,
        players,
        reports,
        addGame,
        deleteGame,
        addSlot,
        deleteSlot,
        togglePlayerBlock,
        markReportAsReviewed,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
