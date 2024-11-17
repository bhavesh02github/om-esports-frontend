import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import Announcements from './components/home/Announcements';
import FeaturedGames from './components/home/FeaturedGames';

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <Announcements />
      <main>
        <Hero />
        <FeaturedGames />
      </main>
    </div>
  );
}

export default App;