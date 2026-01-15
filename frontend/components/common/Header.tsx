'use client';

import { useState } from 'react';

export default function Header() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <header className="bg-black text-white text-center py-2 px-4 text-xs sm:text-sm">
      <span className="hidden sm:inline">Sign up and get 20% off to your first order. Sign Up Now</span>
      <span className="sm:hidden">Get 20% off your first order!</span>
      <button 
        className="ml-2 sm:ml-4 text-white hover:text-gray-300"
        onClick={() => setIsVisible(false)}
      >
        ×
      </button>
    </header>
  );
}