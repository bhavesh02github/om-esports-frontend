import React from 'react';
import { Bell } from 'lucide-react';
import type { Announcement } from '../../types';

const announcements: Announcement[] = [
  {
    id: '1',
    message: '🎮 New BGMI Tournament starting this weekend! Register now to participate.',
    type: 'info',
    active: true
  },
  {
    id: '2',
    message: '🏆 Congratulations to Team Phoenix for winning yesterday\'s Freefire championship!',
    type: 'success',
    active: true
  }
];

export default function Announcements() {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const getAnnouncementStyle = (type: Announcement['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-100 text-blue-800';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'success':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40">
      <div className={`px-4 py-2 transition-all duration-500 ${getAnnouncementStyle(announcements[currentIndex].type)}`}>
        <div className="flex items-center justify-center gap-2">
          <Bell className="h-4 w-4" />
          <p className="text-sm font-medium">{announcements[currentIndex].message}</p>
        </div>
      </div>
    </div>
  );
}