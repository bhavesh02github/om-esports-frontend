import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatboxButtonProps {
  unreadCount?: number;
}

export default function ChatboxButton({ unreadCount = 0 }: ChatboxButtonProps) {
  return (
    <a
      href="/chatbox"
      className="fixed bottom-6 right-6 bg-indigo-600 text-white rounded-full p-4 shadow-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
    >
      <MessageSquare className="h-6 w-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
          {unreadCount}
        </span>
      )}
      <span className="sr-only">View Chatbox</span>
    </a>
  );
}