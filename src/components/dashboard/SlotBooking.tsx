import React from 'react';
import { Users, User, Users2 } from 'lucide-react';
import BookingConfirmation from '../booking/BookingConfirmation';

interface SlotBookingProps {
  gameId: string;
  selectedMode: 'solo' | 'duo' | 'squad';
  onModeChange: (mode: 'solo' | 'duo' | 'squad') => void;
}

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  totalSlots: number;
  bookedSlots: number;
  mode: 'solo' | 'duo' | 'squad';
}

const timeSlots: TimeSlot[] = [
  { id: '1', startTime: '10:00', endTime: '11:00', totalSlots: 100, bookedSlots: 45, mode: 'solo' },
  { id: '2', startTime: '11:00', endTime: '12:00', totalSlots: 100, bookedSlots: 98, mode: 'solo' },
  { id: '3', startTime: '13:00', endTime: '14:00', totalSlots: 50, bookedSlots: 25, mode: 'duo' },
  { id: '4', startTime: '14:00', endTime: '15:00', totalSlots: 50, bookedSlots: 48, mode: 'duo' },
  { id: '5', startTime: '16:00', endTime: '17:00', totalSlots: 25, bookedSlots: 10, mode: 'squad' },
  { id: '6', startTime: '17:00', endTime: '18:00', totalSlots: 25, bookedSlots: 24, mode: 'squad' },
];

const games = [
  {
    id: 'bgmi',
    name: 'BGMI',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    slots: 100,
    active: true
  },
  {
    id: 'freefire',
    name: 'Free Fire',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    slots: 80,
    active: true
  },
  {
    id: 'codm',
    name: 'Call of Duty Mobile',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    slots: 60,
    active: true
  }
];

export default function SlotBooking({ gameId, selectedMode, onModeChange }: SlotBookingProps) {
  const [selectedSlot, setSelectedSlot] = React.useState<TimeSlot | null>(null);
  const filteredSlots = timeSlots.filter(slot => slot.mode === selectedMode);
  const game = games.find(g => g.id === gameId)!;

  if (selectedSlot) {
    return (
      <BookingConfirmation
        game={game}
        slot={selectedSlot}
        onBack={() => setSelectedSlot(null)}
        onComplete={() => setSelectedSlot(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => onModeChange('solo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            selectedMode === 'solo'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <User className="h-5 w-5" />
          <span>Solo</span>
        </button>
        <button
          onClick={() => onModeChange('duo')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            selectedMode === 'duo'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Users className="h-5 w-5" />
          <span>Duo</span>
        </button>
        <button
          onClick={() => onModeChange('squad')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            selectedMode === 'squad'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          <Users2 className="h-5 w-5" />
          <span>Squad</span>
        </button>
      </div>

      {/* Time Slots Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSlots.map((slot) => {
          const availableSlots = slot.totalSlots - slot.bookedSlots;
          const isFullyBooked = availableSlots === 0;

          return (
            <div
              key={slot.id}
              className={`bg-gray-800 rounded-lg p-6 ${
                isFullyBooked ? 'opacity-75' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-white">
                    {slot.startTime} - {slot.endTime}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {availableSlots} slots available
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs font-medium rounded-full px-2 py-1 bg-gray-700 text-gray-300">
                  {slot.mode.toUpperCase()}
                </div>
              </div>

              <div className="mb-4">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      isFullyBooked ? 'bg-red-500' : 'bg-green-500'
                    }`}
                    style={{
                      width: `${(slot.bookedSlots / slot.totalSlots) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => setSelectedSlot(slot)}
                disabled={isFullyBooked}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  isFullyBooked
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700'
                }`}
              >
                {isFullyBooked ? 'Fully Booked' : 'Book Slot'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}