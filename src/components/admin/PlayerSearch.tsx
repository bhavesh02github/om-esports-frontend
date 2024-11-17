import React, { useState } from 'react';
import { Search } from 'lucide-react';

interface PlayerSearchProps {
  onSearch: (query: string) => void;
}

export const PlayerSearch = ({ onSearch }: PlayerSearchProps) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by ID, username, or email..."
          className="input w-full pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
      </div>
    </form>
  );
};