import React, { useState, useMemo, useEffect } from 'react';
import { Search, Heart, ShoppingCart, Download, Headphones, BookOpen, PlayCircle, Star, X } from 'lucide-react';
import { Book, BookType } from '../types';
import { BOOKS } from '../data';

interface BrowseScreenProps {
  initialSearchQuery?: string;
  onAddToCart: (book: Book) => void;
  wishlistIds: string[];
  onToggleWishlist: (bookId: string) => void;
}

const CATEGORIES = ['All', 'Fiction', 'Tech', 'Business', 'Study Notes', 'Courses'] as const;

// Default premium SVG fallback image for missing book covers
const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'><rect width='100%' height='100%' fill='%23F0F6FA'/><text x='50%' y='50%' font-family='Georgia' font-style='italic' font-size='16' fill='%2373848E' text-anchor='middle'>Cover Unavailable</text></svg>";

// Premium animated skeleton loader component
const BookCardSkeleton = () => (
  <div className="flex flex-col bg-surface-soft border border-border-light rounded-2xl overflow-hidden shadow-sm animate-pulse">
    <div className="aspect-[3/4] bg-surface-container relative"></div>
    <div className="p-5 flex flex-col flex-grow space-y-3">
      <div className="h-4 bg-surface-container rounded w-3/4"></div>
      <div className="h-3 bg-surface-container rounded w-1/2"></div>
      <div className="h-3 bg-surface-container rounded w-1/4"></div>
      
      <div className="pt-3 border-t border-border-light flex justify-between items-center mt-auto">
        <div className="h-5 bg-surface-container rounded w-1/3"></div>
        <div className="w-10 h-10 bg-surface-container rounded-xl"></div>
      </div>
    </div>
  </div>
);

export default function BrowseScreen({ 
  initialSearchQuery = '', 
  onAddToCart, 
  wishlistIds, 
  onToggleWishlist 
}: BrowseScreenProps) {
  // Dual-state search for input debouncing
  const [searchInputValue, setSearchInputValue] = useState(initialSearchQuery);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>('All');
  const [sortBy, setSortBy] = useState<'popularity' | 'priceLow' | 'priceHigh' | 'newest'>('popularity');
  const [isLoading, setIsLoading] = useState(true);
  
  // State for the Book Quick View Modal
  const [quickViewBook, setQuickViewBook] = useState<Book | null>(null);

  // Sync state if initialSearchQuery changes from parent component
  useEffect(() => {
    setSearchInputValue(initialSearchQuery);
    setSearchQuery(initialSearchQuery);
  }, [initialSearchQuery]);

  // Debounce search typing value (250ms)
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(searchInputValue);
    }, 250);
    return () => clearTimeout(handler);
  }, [searchInputValue]);

  // Simulated fetching loader transition whenever sorting or filtering changes
  useEffect(() => {
    setIsLoading(true);
    const handler = setTimeout(() => {
      setIsLoading(false);
    }, 500); // 500ms premium skeleton duration
    return () => clearTimeout(handler);
  }, [searchQuery, selectedCategory, sortBy]);

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
      // Popularity (default simulation based on id)
      result.sort((a, b) => a.id.localeCompare(b.id));
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  // Contextual icon based on publication format
  const renderActionIcon = (type: BookType) => {
    switch (type) {
      case 'ebook':
        return <Download className="w-4 h-4 text-white" />;
      case 'audiobook':
        return <Headphones className="w-4 h-4 text-white" />;
      case 'notes':
        return <BookOpen className="w-4 h-4 text-white" />;
      case 'course':
        return <PlayCircle className="w-4 h-4 text-white" />;
      default:
        return <ShoppingCart className="w-4 h-4 text-white" />;
    }
  };

  const getFormatBadgeStyle = (type: BookType) => {
    switch (type) {
      case 'ebook':
        return 'bg-primary-blue/10 text-primary-blue border-primary-blue/20';
      case 'audiobook':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'notes':
        return 'bg-success-green/10 text-success-green border-success-green/20';
      case 'course':
        return 'bg-primary-blue-container text-white border-transparent';
      default:
        return 'bg-surface-container text-text-primary border-border-light';
    }
  };

  // Generate simulated reviews/stats based on book title length
  const getBookRating = (id: string) => {
    const num = id.charCodeAt(id.length - 1) || 5;
    const rating = 4.0 + (num % 10) / 10;
    const reviewsCount = 15 + (num * 7) % 150;
    return {
      stars: parseFloat(Math.min(5, rating).toFixed(1)),
      count: reviewsCount
    };
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-12 py-6 animate-fade-in">
      
      {/* Search Input Box */}
      <section className="relative">
        <div className="relative group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-blue transition-colors w-5 h-5" />
          <input
            type="text"
            placeholder="Search by title, author, category, or keyword..."
            value={searchInputValue}
            onChange={(e) => setSearchInputValue(e.target.value)}
            className="w-full h-14 pl-14 pr-6 bg-surface-soft border border-border-light rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue outline-none transition-all font-sans text-sm text-text-primary placeholder:text-text-muted shadow-sm"
          />
        </div>
      </section>

      {/* Filters & Sorting Panel */}
      <section className="space-y-4">
        
        {/* Category chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl font-display text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 cursor-pointer ${
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border-light">
          <p className="font-display text-xs text-text-secondary">
            Showing <span className="text-text-primary font-bold">{filteredAndSortedBooks.length}</span> items in{' '}
            <span className="text-primary-blue font-bold">{selectedCategory}</span>
          </p>
          
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="font-display text-xs text-text-muted">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="bg-transparent border-none font-display text-xs font-bold text-primary-blue focus:ring-0 cursor-pointer outline-none pr-2 py-1"
            >
              <option value="popularity">Popularity</option>
              <option value="newest">Newest Arrivals</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
            </select>
          </div>
        </div>

      </section>

      {/* Product Grid Render */}
      {isLoading ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <BookCardSkeleton key={index} />
          ))}
        </section>
      ) : filteredAndSortedBooks.length === 0 ? (
        <div className="py-20 text-center space-y-3">
          <p className="text-text-muted font-sans text-sm">No items match your filters.</p>
          <button 
            onClick={() => { setSearchInputValue(''); setSearchQuery(''); setSelectedCategory('All'); }} 
            className="text-xs text-primary-blue font-semibold underline cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 book-3d-container">
          {filteredAndSortedBooks.map((book) => {
            const isWishlisted = wishlistIds.includes(book.id);
            const rating = getBookRating(book.id);
            return (
              <div 
                key={book.id}
                onClick={() => setQuickViewBook(book)}
                className="group flex flex-col bg-surface-soft border border-border-light rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 cursor-pointer book-3d-card"
              >
                {/* Book Card Cover area */}
                <div className="aspect-[3/4] relative overflow-hidden bg-surface-container">
                  <div className="book-spine-overlay"></div>
                  <div className="book-edge-overlay"></div>
                  
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                  
                  {/* Category Type Badge */}
                  <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider border shadow-sm ${getFormatBadgeStyle(book.type)}`}>
                    {book.type === 'notes' ? 'Study Notes' : book.type}
                  </span>

                  {/* Wishlist Heart Toggle Button */}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(book.id);
                    }}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-sm text-text-secondary hover:text-error-red cursor-pointer"
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
                  <p className="font-sans text-xs text-text-secondary mb-3 truncate">
                    {book.author}
                  </p>

                  {/* Rating Block */}
                  <div className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold mb-4">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      <span className="ml-1">{rating.stars.toFixed(1)}</span>
                    </span>
                    <span className="text-text-muted">({rating.count})</span>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-border-light/60">
                    <div className="flex flex-col">
                      <span className="font-display text-base font-bold text-primary-blue">
                        ₹{book.price.toFixed(2)}
                      </span>
                      {book.includedInSubscription && (
                        <span className="font-mono text-[9px] text-success-green font-semibold mt-0.5">
                          Included in Access
                        </span>
                      )}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(book);
                      }}
                      className="w-10 h-10 rounded-xl bg-primary-blue hover:bg-primary-blue-container text-white flex items-center justify-center transition-all active:scale-90 shadow-sm cursor-pointer"
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

      {/* Book Quick View Modal Overlay */}
      {quickViewBook && (() => {
        const rating = getBookRating(quickViewBook.id);
        const isWishlisted = wishlistIds.includes(quickViewBook.id);
        return (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
            <div className="bg-surface-card rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-border-light flex flex-col md:flex-row relative animate-fade-in">
              
              <button 
                onClick={() => setQuickViewBook(null)}
                className="absolute right-4 top-4 text-text-muted hover:text-text-primary p-1.5 hover:bg-surface-soft rounded-full transition-colors z-10 cursor-pointer"
                title="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Left Side Cover Photo */}
              <div className="w-full md:w-5/12 bg-surface-soft p-8 flex items-center justify-center border-r border-border-light relative select-none">
                <div className="relative aspect-[3/4] max-w-[200px] w-full shadow-2xl rounded-xl overflow-hidden book-3d-container">
                  <div className="book-spine-overlay"></div>
                  <div className="book-edge-overlay"></div>
                  <img 
                    src={quickViewBook.image} 
                    alt={quickViewBook.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      e.currentTarget.src = PLACEHOLDER_IMAGE;
                    }}
                  />
                </div>
              </div>

              {/* Right Side Content details */}
              <div className="w-full md:w-7/12 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider border ${getFormatBadgeStyle(quickViewBook.type)}`}>
                      {quickViewBook.type === 'notes' ? 'Study Notes' : quickViewBook.type}
                    </span>
                    <span className="font-mono text-[9px] text-text-muted">ID: {quickViewBook.id}</span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-text-primary leading-tight mb-2">
                    {quickViewBook.title}
                  </h3>
                  
                  <p className="font-sans text-sm text-primary-blue font-semibold mb-4">
                    by {quickViewBook.author}
                  </p>

                  <div className="flex items-center gap-2 mb-6 text-xs text-text-secondary">
                    <span className="flex items-center gap-0.5 text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span className="font-semibold text-text-primary ml-1">{rating.stars}</span>
                    </span>
                    <span className="text-text-muted">| {rating.count} Reader reviews</span>
                  </div>

                  <p className="text-text-secondary text-xs leading-relaxed font-sans mb-6">
                    {quickViewBook.description || "No description provided for this collection item. A premium edition curated specifically for BookVerse collectors and design enthusiasts."}
                  </p>

                  {/* Metadata Specs */}
                  <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-text-muted bg-surface-soft p-4 rounded-xl border border-border-light mb-6">
                    <div>
                      <span className="block text-[9px] text-text-muted uppercase tracking-wider">Format</span>
                      <span className="font-bold text-text-primary capitalize">{quickViewBook.type} Edition</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-text-muted uppercase tracking-wider">Publisher</span>
                      <span className="font-bold text-text-primary">Studio Verse Publishing</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-text-muted uppercase tracking-wider">Language</span>
                      <span className="font-bold text-text-primary">English (US)</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-text-muted uppercase tracking-wider">Access</span>
                      <span className="font-bold text-text-primary">Downloadable PDF</span>
                    </div>
                  </div>
                </div>

                {/* Purchase Action row */}
                <div className="flex items-center gap-4 pt-4 border-t border-border-light/60">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-text-muted uppercase tracking-wider">Price</span>
                    <span className="font-display text-xl font-bold text-primary-blue">₹{quickViewBook.price.toFixed(2)}</span>
                  </div>

                  <div className="flex-1 flex gap-2">
                    <button
                      onClick={() => {
                        onAddToCart(quickViewBook);
                        setQuickViewBook(null);
                      }}
                      className="flex-1 bg-primary-blue hover:bg-primary-blue-container text-white py-3 rounded-xl font-display text-xs font-bold uppercase tracking-widest active:scale-95 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {renderActionIcon(quickViewBook.type)}
                      Add to Bag
                    </button>
                    
                    <button
                      onClick={() => onToggleWishlist(quickViewBook.id)}
                      className="w-12 border border-border-light hover:border-error-red hover:bg-error-red/5 text-text-secondary hover:text-error-red rounded-xl flex items-center justify-center transition-all cursor-pointer"
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-error-red text-error-red' : ''}`} />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        );
      })()}

    </div>
  );
}
