import React from 'react';
import { ChevronRight, Gamepad2, Trophy, Users } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-gray-900 pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gray-900/90" />
      </div>
      
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-6xl">
          Level Up Your Gaming Career
        </h1>
        <p className="mt-6 max-w-3xl text-xl text-gray-300">
          Join OM E-Sports to compete in professional tournaments, earn rewards, and become part of an elite gaming community.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Get Started
            <ChevronRight className="ml-2 h-5 w-5" />
          </button>
          <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50">
            View Tournaments
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <Trophy className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-white">Professional Tournaments</h3>
              <p className="mt-1 text-sm text-gray-300">Compete in daily tournaments with real prizes</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <Gamepad2 className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-white">Multiple Games</h3>
              <p className="mt-1 text-sm text-gray-300">BGMI, Freefire, Call of Duty, and more</p>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
              <Users className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-white">Active Community</h3>
              <p className="mt-1 text-sm text-gray-300">Join thousands of active players</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}