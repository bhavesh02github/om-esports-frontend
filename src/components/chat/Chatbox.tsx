import React, { useState, useRef, useEffect } from 'react';
import { X, Send, AlertTriangle, Ban } from 'lucide-react';
import { useChat } from '../../context/ChatContext';
import { useAdmin } from '../../context/AdminContext';
import { Message } from '../../../types';

interface ChatBoxProps {
  slotId: string;
  onClose: () => void;
  isAdmin?: boolean;
}

export const ChatBox = ({ slotId, onClose, isAdmin = false }: ChatBoxProps) => {
  const { messages, sendMessage, clearMessages, muteUser } = useChat();
  const { slots, games } = useAdmin();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const slot = slots.find(s => s.id === slotId);
  const game = slot ? games.find(g => g.id === slot.gameId) : null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(slotId, newMessage.trim());
      setNewMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-none p-4 bg-gray-800 border-b border-gray-700 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{game?.name}</h2>
          <p className="text-sm text-gray-400">
            {slot?.time} ({slot?.duration} minutes)
          </p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-700 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.isAdmin ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[75%] rounded-lg px-4 py-2 ${
                message.isAdmin
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 text-white'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {message.username}
                </span>
                {isAdmin && !message.isAdmin && (
                  <div className="flex space-x-1">
                    <button
                      onClick={() => muteUser(message.userId)}
                      className="p-1 hover:bg-gray-600 rounded"
                      title="Mute user"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-gray-600 rounded"
                      title="Warn user"
                    >
                      <AlertTriangle className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-1">{message.content}</p>
              <span className="text-xs opacity-75">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="flex-none p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 input"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="btn btn-primary"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
};