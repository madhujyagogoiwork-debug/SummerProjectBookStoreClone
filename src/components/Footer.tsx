import React from 'react';
import { Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-surface-container-highest bg-surface-card mt-20">
      <div className="flex flex-col md:flex-row justify-between items-center py-8 px-4 md:px-12 max-w-7xl mx-auto gap-6">
        
        {/* Brand & Copy */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <h3 className="font-display text-lg font-bold tracking-tight text-text-primary">
            BookVerse
          </h3>
          <p className="font-sans text-xs text-text-muted">
            © 2026 BookVerse. The Art of Reading. All rights reserved.
          </p>
        </div>

        {/* Navigation links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-text-secondary">
          <a href="#collections" className="hover:text-primary-blue transition-colors">
            Collections
          </a>
          <a href="#archive" className="hover:text-primary-blue transition-colors">
            Digital Archive
          </a>
          <a href="#hub" className="hover:text-primary-blue transition-colors">
            Learning Hub
          </a>
          <a href="#privacy" className="hover:text-primary-blue transition-colors underline decoration-border-light">
            Privacy Policy
          </a>
        </div>

        {/* Global/Share Buttons */}
        <div className="flex gap-4 text-text-muted">
          <button 
            className="hover:text-primary-blue transition-colors p-1" 
            title="Language: English"
            onClick={() => alert('Language options are simulated.')}
          >
            <Globe className="w-4 h-4" />
          </button>
          <button 
            className="hover:text-primary-blue transition-colors p-1" 
            title="Share BookVerse"
            onClick={() => alert('Share link copied to clipboard!')}
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
