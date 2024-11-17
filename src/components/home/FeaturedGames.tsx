import React from 'react';
import type { Game } from '../../types';

const games: Game[] = [
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

export default function FeaturedGames() {
  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Featured Games</h2>
          <p className="mt-4 text-lg text-gray-400">
            Choose from our selection of popular competitive games and start your professional gaming journey.
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {games.map((game) => (
            <div
              key={game.id}
              className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
            >
              <img
                src={game.image}
                alt={game.name}
                className="absolute inset-0 -z-10 h-full w-full object-cover"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
              
              <h3 className="mt-3 text-2xl font-bold text-white">
                {game.name}
              </h3>
              
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-0.5 text-sm font-medium text-green-800">
                  {game.slots} slots available
                </span>
                <button className="inline-flex items-center rounded-full bg-indigo-600 px-4 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Join Tournament
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}