import React, { useState } from 'react';
import { Menu, Search, ShoppingCart, User } from 'lucide-react';
import { Book, CartItem } from '../types';

interface HeaderProps {
  activeTab: 'home' | 'browse' | 'cart' | 'profile';
  onNavigate: (tab: 'home' | 'browse' | 'cart' | 'profile') => void;
  cartItems: CartItem[];
  userAvatar: string;
  onSearchHome?: (query: string) => void;
}

export default function Header({ activeTab, onNavigate, cartItems, userAvatar, onSearchHome }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchHome && localSearch.trim()) {
      onSearchHome(localSearch);
      setLocalSearch('');
      setShowSearch(false);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-card/80 backdrop-blur-md border-b border-surface-container-high shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-12 h-20 w-full max-w-7xl mx-auto">
        
        {/* Left Side: Logo & Menu */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('browse')}
            className="text-primary-blue hover:bg-surface-container-low p-2 rounded-full transition-all duration-200 active:scale-95"
            title="Browse Categories"
          >
            <Menu className="w-6 h-6" />
          </button>
          
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <h1 className="font-display italic text-2xl font-semibold tracking-tight text-text-primary group-hover:text-primary-blue transition-colors">
              BookVerse
            </h1>
            <span className="hidden sm:inline-block w-1.5 h-1.5 bg-primary-blue rounded-full"></span>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => onNavigate('home')}
            className={`font-display text-sm tracking-wide font-medium transition-all py-1 border-b-2 ${
              activeTab === 'home'
                ? 'text-primary-blue font-semibold border-primary-blue'
                : 'text-text-secondary hover:text-primary-blue border-transparent'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('browse')}
            className={`font-display text-sm tracking-wide font-medium transition-all py-1 border-b-2 ${
              activeTab === 'browse'
                ? 'text-primary-blue font-semibold border-primary-blue'
                : 'text-text-secondary hover:text-primary-blue border-transparent'
            }`}
          >
            Browse
          </button>
          <button
            onClick={() => onNavigate('cart')}
            className={`font-display text-sm tracking-wide font-medium transition-all py-1 border-b-2 ${
              activeTab === 'cart'
                ? 'text-primary-blue font-semibold border-primary-blue'
                : 'text-text-secondary hover:text-primary-blue border-transparent'
            }`}
          >
            Cart
          </button>
          <button
            onClick={() => onNavigate('profile')}
            className={`font-display text-sm tracking-wide font-medium transition-all py-1 border-b-2 ${
              activeTab === 'profile'
                ? 'text-primary-blue font-semibold border-primary-blue'
                : 'text-text-secondary hover:text-primary-blue border-transparent'
            }`}
          >
            Profile
          </button>
        </nav>

        {/* Right Side: Search, Cart, Avatar */}
        <div className="flex items-center gap-4">
          
          {/* Interactive Desktop Search Toggle */}
          <div className="relative">
            {showSearch && (
              <form onSubmit={handleSearchSubmit} className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center bg-surface-card border border-border-light rounded-lg shadow-md px-3 py-1.5 z-50 w-64 animate-fade-in">
                <input
                  type="text"
                  placeholder="Search and hit Enter..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full text-xs text-text-primary bg-transparent outline-none border-none placeholder-text-muted"
                  autoFocus
                />
              </form>
            )}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-primary-blue hover:bg-surface-container-low p-2 rounded-full transition-all duration-200 active:scale-90"
              title="Quick Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Icon with badge */}
          <button
            onClick={() => onNavigate('cart')}
            className="text-primary-blue hover:bg-surface-container-low p-2 rounded-full transition-all duration-200 active:scale-90 relative"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute top-0.5 right-0.5 min-w-4 h-4 px-1 bg-error-red text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-surface-card shadow-sm">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Profile Quick Link */}
          <button
            onClick={() => onNavigate('profile')}
            className="relative w-9 h-9 rounded-full overflow-hidden border border-border-light hover:border-primary-blue active:scale-95 transition-all shadow-sm"
            title="Julian Thorne's Profile"
          >
            <img 
              src={userAvatar} 
              alt="User profile avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>

        </div>
      </div>
    </header>
  );
}
