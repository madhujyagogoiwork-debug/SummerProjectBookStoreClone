import React, { useState, useMemo } from 'react';
import { Search, Heart, ShoppingCart, Download, Headphones, BookOpen, PlayCircle, Star } from 'lucide-react';
import { Book, BookType } from '../types';
import { BOOKS } from '../data';

interface BrowseScreenProps {
  initialSearchQuery?: string;
  onAddToCart: (book: Book) => void;
  wishlistIds: string[];
  onToggleWishlist: (bookId: string) => void;
}

const CATEGORIES = ['All', 'Fiction', 'Tech', 'Business', 'Study Notes', 'Courses'] as const;

export default function BrowseScreen({ 
  initialSearchQuery = '', 
  onAddToCart, 
  wishlistIds, 
  onToggleWishlist 
}: BrowseScreenProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('All');
  const [sortBy, setSortBy] = useState<'popularity' | 'priceLow' | 'priceHigh' | 'newest'>('popularity');

  // Dynamically filter & sort book array
  const filteredAndSortedBooks = useMemo(() => {
    let result = [...BOOKS];

    // Search Query Filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        b => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
      );
    }

    // Category Filter
    if (selectedCategory !== 'All') {
      result = result.filter(b => b.category === selectedCategory);
    }

    // Sort Logic
    if (sortBy === 'priceLow') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'priceHigh') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    } else {
      // Popularity (default simulation based on id length or custom weight)
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Contextual icon based on publication format
  const renderActionIcon = (type: BookType) => {
    switch (type) {
      case 'ebook':
        return <Download className="w-5 h-5 text-white" />;
      case 'audiobook':
        return <Headphones className="w-5 h-5 text-white" />;
      case 'notes':
        return <BookOpen className="w-5 h-5 text-white" />;
      case 'course':
        return <PlayCircle className="w-5 h-5 text-white" />;
      default:
        return <ShoppingCart className="w-5 h-5 text-white" />;
    }
  };

  const getFormatBadgeStyle = (type: BookType) => {
    switch (type) {
      case 'ebook':
        return 'bg-primary-blue/10 text-primary-blue border-primary-blue/20';
      case 'audiobook':
        return 'bg-secondary-container text-on-secondary-container border-border-light';
      case 'notes':
        return 'bg-success-green/10 text-success-green border-success-green/20';
      case 'course':
        return 'bg-primary-blue-container text-white border-transparent';
      default:
        return 'bg-surface-container-high text-text-primary border-border-light';
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-12 py-6 animate-fade-in">
      
      {/* Search Input Box */}
      <section className="relative">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-blue transition-colors w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, author, category, or ISBN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-surface-soft border border-border-light rounded-full focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue outline-none transition-all font-sans text-sm text-text-primary placeholder:text-text-muted shadow-sm"
          />
        </div>
      </section>

      {/* Filters & Sorting Panel */}
      <section className="space-y-4">
        
        {/* Category horizontal scrolling chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-display text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-primary-blue text-white shadow-sm'
                    : 'bg-primary-blue/5 text-primary-blue border border-primary-blue/10 hover:bg-primary-blue/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Dynamic Sorting Selection and Meta Count */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-surface-container">
          <p className="font-display text-xs text-text-secondary">
            Showing <span className="text-text-primary font-bold">{filteredAndSortedBooks.length}</span> items in{' '}
            <span className="text-primary-blue font-bold">{selectedCategory}</span>
          </p>
          
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="font-display text-xs text-text-muted">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent border-none font-display text-xs font-semibold text-primary-blue focus:ring-0 cursor-pointer outline-none pr-2 py-1"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest Arrivals</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

      </section>

      {/* Product Card Grid */}
      {filteredAndSortedBooks.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="text-text-muted font-sans text-sm">No items match your filters.</p>
          <button 
            onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} 
            className="text-xs text-primary-blue font-semibold underline"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedBooks.map((book) => {
            const isWishlisted = wishlistIds.includes(book.id);
            return (
              <div 
                key={book.id}
                className="group flex flex-col bg-surface-soft border border-surface-container-highest/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* Book Card Cover area */}
                <div className="aspect-[3/4] relative overflow-hidden bg-surface-container">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Category Type Badge */}
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border shadow-sm ${getFormatBadgeStyle(book.type)}`}>
                    {book.type === 'notes' ? 'Study Notes' : book.type}
                  </span>

                  {/* Wishlist Heart Toggle Button */}
                  <button 
                    onClick={() => onToggleWishlist(book.id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm text-text-secondary hover:text-error-red"
                    title={isWishlisted ? "Remove from wishlist" : "Save to wishlist"}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-error-red text-error-red' : ''}`} />
                  </button>
                </div>

                {/* Book Info Area */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-display text-base font-bold text-text-primary leading-tight truncate mb-1" title={book.title}>
                    {book.title}
                  </h3>
                  <p className="font-sans text-xs text-text-secondary mb-4 truncate">
                    {book.author}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="font-display text-base font-bold text-primary-blue">
                        ${book.price.toFixed(2)}
                      </span>
                      {book.includedInSubscription && (
                        <span className="font-mono text-[9px] text-success-green font-semibold mt-0.5">
                          Included in Access
                        </span>
                      )}
                    </div>

                    {/* Format specific button action */}
                    <button
                      onClick={() => onAddToCart(book)}
                      className="w-10 h-10 rounded-xl bg-primary-blue hover:bg-primary-blue-container text-white flex items-center justify-center transition-all active:scale-90 shadow-sm"
                      title={`Add ${book.title} to Cart`}
                    >
                      {renderActionIcon(book.type)}
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </section>
      )}

    </div>
  );
}
