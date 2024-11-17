import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home,
  GamepadIcon, 
  Clock, 
  Users, 
  Bell, 
  BarChart3,
  Settings,
  X 
} from 'lucide-react';
import { clsx } from 'clsx';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: GamepadIcon, label: 'Games', path: '/games' },
  { icon: Clock, label: 'Slots', path: '/slots' },
  { icon: Users, label: 'Players', path: '/players' },
  { icon: Bell, label: 'Announcements', path: '/announcements' },
  { icon: BarChart3, label: 'Reports', path: '/reports' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      <aside
        className={clsx(
          'fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-800',
          'transform transition-transform duration-300 ease-in-out z-50',
          'lg:transform-none lg:transition-none',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold text-purple-500">Admin Dashboard</h1>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                clsx(
                  'flex items-center space-x-3 p-3 rounded-lg',
                  'transition-colors duration-200',
                  isActive
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                )
              }
              onClick={() => onClose()}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};