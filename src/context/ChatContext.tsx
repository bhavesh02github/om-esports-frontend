import React, { createContext, useContext, useState } from 'react';

interface Message {
  id: string;
  slotId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
  isAdmin: boolean;
}

interface ChatContextType {
  messages: Message[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  sendMessage: (slotId: string, content: string) => void;
  clearMessages: (slotId: string) => void;
  muteUser: (userId: string) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [mutedUsers, setMutedUsers] = useState<string[]>([]);

  const sendMessage = (slotId: string, content: string) => {
    const newMessage: Message = {
      id: crypto.randomUUID(),
      slotId,
      userId: 'current-user', // Replace with actual user ID
      username: 'Current User', // Replace with actual username
      content,
      timestamp: Date.now(),
      isAdmin: false,
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const clearMessages = (slotId: string) => {
    setMessages(prev => prev.filter(msg => msg.slotId !== slotId));
  };

  const muteUser = (userId: string) => {
    setMutedUsers(prev => [...prev, userId]);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        activeChatId,
        setActiveChatId,
        sendMessage,
        clearMessages,
        muteUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};