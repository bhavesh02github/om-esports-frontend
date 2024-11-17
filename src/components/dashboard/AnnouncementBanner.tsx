import React from 'react';
import { Bell, X } from 'lucide-react';
import type { Announcement } from '../../types';

const announcements: Announcement[] = [
  {
    id: '1',
    message: '🎮 New BGMI Tournament starting this weekend! Register now.',
    type: 'info',
    active: true
  },
  {
    id: '2',
    message: '🏆 Congratulations to Team Phoenix for winning yesterday\'s championship!',
    type: 'success',
    active: true
  }
];

export default function AnnouncementBanner() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    if (announcements.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % announcements.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, []);

  if (!isVisible || announcements.length === 0) return null;

  const currentAnnouncement = announcements[currentIndex];

  return (
    <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${
      getAnnouncementStyle(currentAnnouncement.type)
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Bell className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium truncate">
              {currentAnnouncement.message}
            </p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="flex-shrink-0 rounded-md p-1 hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function getAnnouncementStyle(type: Announcement['type']) {
  switch (type) {
    case 'info':
      return 'bg-blue-600 text-white';
    case 'warning':
      return 'bg-yellow-500 text-black';
    case 'success':
      return 'bg-green-600 text-white';
    default:
      return 'bg-gray-700 text-white';
  }
}