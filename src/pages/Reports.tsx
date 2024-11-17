import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { CheckCircle } from 'lucide-react';

export const Reports = () => {
  const { reports, markReportAsReviewed, players, games } = useAdmin();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Player Reports</h1>

      <div className="grid gap-4">
        {reports.map(report => {
          const player = players.find(p => p.id === report.playerId);
          const game = games.find(g => g.id === report.gameId);
          
          return (
            <div key={report.id} className="card">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-semibold">
                      {player?.name || 'Unknown Player'}
                    </h3>
                    <span
                      className={`px-2 py-1 text-sm rounded-full ${
                        report.isReviewed
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {report.isReviewed ? 'Reviewed' : 'Pending'}
                    </span>
                  </div>
                  <p className="text-gray-400">
                    Game: {game?.name} • Time: {report.slotTime}
                  </p>
                </div>
                
                {!report.isReviewed && (
                  <button
                    onClick={() => markReportAsReviewed(report.id)}
                    className="p-2 text-green-400 hover:bg-green-400/20 rounded-lg transition-colors"
                  >
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              
              <p className="mt-4">{report.message}</p>
              
              {report.screenshot && (
                <img
                  src={report.screenshot}
                  alt="Report Screenshot"
                  className="mt-4 rounded-lg w-full max-w-lg"
                />
              )}
            </div>
          );
        })}
      </div>

      {reports.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No reports submitted yet.</p>
        </div>
      )}
    </div>
  );
};