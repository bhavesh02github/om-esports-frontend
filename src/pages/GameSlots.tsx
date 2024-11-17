import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Plus, Trash2 } from 'lucide-react';
import { SlotForm } from '../components/SlotForm';

export const Slots = () => {
  const { slots, addSlot, deleteSlot, games } = useAdmin();
  const [showForm, setShowForm] = useState(false);

  const handleAddSlot = (data: {
    gameId: string;
    time: string;
    duration: number;
    types: ('solo' | 'duo' | 'squad')[];
    prices: {
      solo?: number;
      duo?: number;
      squad?: number;
    };
  }) => {
    addSlot({
      ...data,
      maxBookings: 4, // Default value, could be made configurable
    });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Time Slots</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn btn-primary flex items-center space-x-2"
          disabled={games.length === 0}
        >
          <Plus className="w-5 h-5" />
          <span>Add Slot</span>
        </button>
      </div>

      <div className="grid gap-6">
        {slots.map(slot => {
          const game = games.find(g => g.id === slot.gameId);
          
          return (
            <div key={slot.id} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{game?.name}</h3>
                  <p className="text-gray-400">Time: {slot.time}</p>
                </div>
                <button
                  onClick={() => deleteSlot(slot.id)}
                  className="p-2 text-red-400 hover:bg-red-400/20 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4">
                {slot.prices.solo && (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Solo</p>
                    <p className="text-lg font-semibold">${slot.prices.solo}</p>
                  </div>
                )}
                {slot.prices.duo && (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Duo</p>
                    <p className="text-lg font-semibold">${slot.prices.duo}</p>
                  </div>
                )}
                {slot.prices.squad && (
                  <div className="bg-gray-700 p-4 rounded-lg">
                    <p className="text-sm text-gray-400">Squad</p>
                    <p className="text-lg font-semibold">${slot.prices.squad}</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {slots.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <p>No slots available. {games.length === 0 ? 'Add some games first!' : 'Click the Add Slot button to create one.'}</p>
        </div>
      )}

      {showForm && (
        <SlotForm
          games={games}
          onSubmit={handleAddSlot}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};