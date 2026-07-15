import React from 'react';
import { Home, Compass, BookOpen, ShoppingBag, User } from 'lucide-react';

interface BottomNavProps {
  activeTab: 'home' | 'browse' | 'cart' | 'profile';
  onNavigate: (tab: 'home' | 'browse' | 'cart' | 'profile') => void;
  cartCount: number;
}

export default function BottomNav({ activeTab, onNavigate, cartCount }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-surface-card border-t border-surface-container-high shadow-lg flex justify-around items-center px-4 py-3 pb-safe md:hidden rounded-t-xl">
      
      {/* Home tab */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center p-2 transition-all duration-200 active:scale-90 ${
          activeTab === 'home'
            ? 'text-primary-blue'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'home' ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
        <span className="font-display text-[10px] mt-1 font-medium">Home</span>
      </button>

      {/* Browse tab */}
      <button
        onClick={() => onNavigate('browse')}
        className={`flex flex-col items-center justify-center p-2 transition-all duration-200 active:scale-90 ${
          activeTab === 'browse'
            ? 'text-primary-blue'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        <Compass className={`w-5 h-5 ${activeTab === 'browse' ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
        <span className="font-display text-[10px] mt-1 font-medium">Browse</span>
      </button>

      {/* Library link (takes to profile continuing reading list or Browse Study Notes) */}
      <button
        onClick={() => onNavigate('profile')}
        className="flex flex-col items-center justify-center p-2 text-text-muted hover:text-text-secondary transition-all duration-200 active:scale-90"
      >
        <BookOpen className="w-5 h-5 stroke-[1.5px]" />
        <span className="font-display text-[10px] mt-1 font-medium">Library</span>
      </button>

      {/* Cart tab */}
      <button
        onClick={() => onNavigate('cart')}
        className={`flex flex-col items-center justify-center p-2 transition-all duration-200 active:scale-90 relative ${
          activeTab === 'cart'
            ? 'text-primary-blue'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        <ShoppingBag className={`w-5 h-5 ${activeTab === 'cart' ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
        <span className="font-display text-[10px] mt-1 font-medium">Cart</span>
        {cartCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-red rounded-full"></span>
        )}
      </button>

      {/* Profile tab */}
      <button
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center p-2 transition-all duration-200 active:scale-90 ${
          activeTab === 'profile'
            ? 'text-primary-blue'
            : 'text-text-muted hover:text-text-secondary'
        }`}
      >
        <User className={`w-5 h-5 ${activeTab === 'profile' ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} />
        <span className="font-display text-[10px] mt-1 font-medium">Profile</span>
      </button>

    </nav>
  );
}
