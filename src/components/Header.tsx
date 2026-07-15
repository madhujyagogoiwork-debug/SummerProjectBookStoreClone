import React, { useState, useEffect } from 'react';
import { Menu, Search, ShoppingCart, Sun, Moon } from 'lucide-react';
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

  // Initialize Dark Mode state from localStorage or system preference
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearchHome && localSearch.trim()) {
      onSearchHome(localSearch);
      setLocalSearch('');
      setShowSearch(false);
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-card/80 backdrop-blur-lg border-b border-border-light shadow-sm transition-all duration-300">
      <div className="flex items-center justify-between px-4 md:px-12 h-20 w-full max-w-7xl mx-auto">
        
        {/* Left Side: Logo & Menu */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('browse')}
            className="text-primary-blue hover:bg-surface-soft p-2.5 rounded-full transition-all duration-200 active:scale-95 cursor-pointer"
            title="Browse Categories"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div 
            onClick={() => onNavigate('home')} 
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <h1 className="font-display italic text-2xl font-bold tracking-tight text-text-primary group-hover:text-primary-blue transition-colors">
              BookVerse
            </h1>
            <span className="w-1.5 h-1.5 bg-primary-blue rounded-full"></span>
          </div>
        </div>

        {/* Desktop Navigation links */}
        <nav className="hidden md:flex items-center space-x-8">
          {(['home', 'browse', 'cart', 'profile'] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => onNavigate(tab)}
                className={`font-display text-xs uppercase tracking-widest font-semibold transition-all py-1 border-b-2 cursor-pointer ${
                  isActive
                    ? 'text-primary-blue border-primary-blue'
                    : 'text-text-muted hover:text-text-primary border-transparent'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </nav>

        {/* Right Side: Search, Dark Mode, Cart, Avatar */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Interactive Desktop Search Toggle */}
          <div className="relative">
            {showSearch && (
              <form 
                onSubmit={handleSearchSubmit} 
                className="absolute right-12 top-1/2 -translate-y-1/2 flex items-center bg-surface-card border border-border-light rounded-xl shadow-lg px-4 py-2 z-50 w-64 animate-fade-in"
              >
                <input
                  type="text"
                  placeholder="Search & hit Enter..."
                  value={localSearch}
                  onChange={(e) => setLocalSearch(e.target.value)}
                  className="w-full text-xs text-text-primary bg-transparent outline-none border-none placeholder:text-text-muted"
                  autoFocus
                />
              </form>
            )}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-text-secondary hover:text-primary-blue hover:bg-surface-soft p-2.5 rounded-full transition-all duration-200 active:scale-90 cursor-pointer"
              title="Quick Search"
            >
              <Search className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="text-text-secondary hover:text-primary-blue hover:bg-surface-soft p-2.5 rounded-full transition-all duration-300 active:rotate-12 cursor-pointer"
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? (
              <Sun className="w-4.5 h-4.5 text-primary-blue animate-pulse" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-text-secondary" />
            )}
          </button>

          {/* Cart Icon with badge */}
          <button
            onClick={() => onNavigate('cart')}
            className="text-text-secondary hover:text-primary-blue hover:bg-surface-soft p-2.5 rounded-full transition-all duration-200 active:scale-90 relative cursor-pointer"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-4.5 h-4.5" />
            {totalCartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-4 h-4 px-1 bg-error-red text-white text-[9px] font-bold rounded-full flex items-center justify-center border border-surface-card shadow-sm animate-pulse">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Profile Quick Link */}
          <button
            onClick={() => onNavigate('profile')}
            className="relative w-9 h-9 rounded-xl overflow-hidden border border-border-light hover:border-primary-blue active:scale-95 transition-all shadow-sm cursor-pointer"
            title="View Profile"
          >
            <img 
              src={userAvatar} 
              alt="User avatar" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </button>

        </div>
      </div>
    </header>
  );
}
