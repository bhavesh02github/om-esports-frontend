import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface TeammateInputProps {
  mode: 'duo' | 'squad';
  teammates: string[];
  onTeammatesChange: (teammates: string[]) => void;
}

export default function TeammateInput({ mode, teammates, onTeammatesChange }: TeammateInputProps) {
  const maxTeammates = mode === 'duo' ? 1 : 3;
  const [currentInput, setCurrentInput] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const handleAddTeammate = () => {
    if (!currentInput) {
      setError('Please enter a Game ID');
      return;
    }

    // Simulate checking for blocked IDs
    if (currentInput === 'BLOCKED123') {
      setError('This Game ID is blocked');
      return;
    }

    if (teammates.includes(currentInput)) {
      setError('This Game ID is already added');
      return;
    }

    if (teammates.length >= maxTeammates) {
      setError(`Maximum ${maxTeammates} teammates allowed`);
      return;
    }

    onTeammatesChange([...teammates, currentInput]);
    setCurrentInput('');
    setError(null);
  };

  const removeTeammate = (index: number) => {
    onTeammatesChange(teammates.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="teammate" className="block text-sm font-medium text-gray-300 mb-2">
          Enter Teammate's Game ID
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            id="teammate"
            value={currentInput}
            onChange={(e) => {
              setCurrentInput(e.target.value);
              setError(null);
            }}
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Game ID"
          />
          <button
            onClick={handleAddTeammate}
            disabled={teammates.length >= maxTeammates}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
        {error && (
          <p className="mt-2 text-sm text-red-500 flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </p>
        )}
      </div>

      {/* Added Teammates List */}
      <div className="space-y-2">
        {teammates.map((teammate, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2"
          >
            <span className="text-white">{teammate}</span>
            <button
              onClick={() => removeTeammate(index)}
              className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-600 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <p className="text-sm text-gray-400">
        {teammates.length}/{maxTeammates} teammates added
      </p>
    </div>
  );
}