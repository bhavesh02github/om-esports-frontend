import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { Users, GamepadIcon, Clock, AlertTriangle } from 'lucide-react';

export const AdminDashboard = () => {
  const { games, players, slots, reports } = useAdmin();
  
  const stats = [
    {
      icon: GamepadIcon,
      label: 'Total Games',
      value: games.length,
      color: 'bg-purple-500',
    },
    {
      icon: Users,
      label: 'Active Players',
      value: players.filter(p => !p.isBlocked).length,
      color: 'bg-blue-500',
    },
    {
      icon: Clock,
      label: 'Active Slots',
      value: slots.length,
      color: 'bg-green-500',
    },
    {
      icon: AlertTriangle,
      label: 'Pending Reports',
      value: reports.filter(r => !r.isReviewed).length,
      color: 'bg-red-500',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value, color }) => (
          <div
            key={label}
            className="bg-gray-800 p-6 rounded-lg border border-gray-700"
          >
            <div className="flex items-center space-x-4">
              <div className={`p-3 rounded-lg ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-gray-400">{label}</p>
                <p className="text-2xl font-bold">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Recent Reports</h2>
          {reports.length === 0 ? (
            <p className="text-gray-400">No reports yet</p>
          ) : (
            <div className="space-y-4">
              {reports.slice(0, 5).map(report => (
                <div
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                >
                  <div>
                    <p className="font-medium">Player ID: {report.playerId}</p>
                    <p className="text-sm text-gray-400">{report.message}</p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      report.isReviewed
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {report.isReviewed ? 'Reviewed' : 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4">Active Games</h2>
          {games.length === 0 ? (
            <p className="text-gray-400">No games added yet</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {games.map(game => (
                <div
                  key={game.id}
                  className="flex flex-col items-center p-4 bg-gray-700 rounded-lg"
                >
                  <img
                    src={game.icon}
                    alt={game.name}
                    className="w-12 h-12 rounded-lg mb-2"
                  />
                  <p className="text-center font-medium">{game.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};