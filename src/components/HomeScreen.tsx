import React, { useState } from 'react';
import { ArrowRight, Search, BookOpen, Quote, Sparkles, Star } from 'lucide-react';
import { Book } from '../types';
import { BOOKS, FEATURED_BOOK, RECOMMENDED_BOOK } from '../data';

interface HomeScreenProps {
  onNavigate: (tab: 'home' | 'browse' | 'cart' | 'profile') => void;
  onSearchHome: (query: string) => void;
  onAddToCart: (book: Book) => void;
}

const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'><rect width='100%' height='100%' fill='%23F0F6FA'/><text x='50%' y='50%' font-family='Georgia' font-style='italic' font-size='16' fill='%2373848E' text-anchor='middle'>Cover Unavailable</text></svg>";

const QUICK_TAGS = ['Minimalism', 'Tech', 'Business', 'Fiction', 'Art'];

export default function HomeScreen({ onNavigate, onSearchHome, onAddToCart }: HomeScreenProps) {
  const [searchVal, setSearchVal] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearchHome(searchVal);
    }
  };

  // Filter 4 books for the "New Releases" horizontal section
  const newReleases = BOOKS.filter(b => b.id === 'b10' || b.id === 'b11' || b.id === 'b12' || b.id === 'b13');

  return (
    <div className="space-y-20 max-w-7xl mx-auto px-4 md:px-12 py-10 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[580px] flex flex-col items-center justify-center text-center overflow-hidden py-16">
        
        {/* Ambient absolute decorative glow elements to match premium aesthetic */}
        <div className="absolute inset-0 -z-10 opacity-40 dark:opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-primary-blue/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary-blue-container/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-4xl space-y-8">
          
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-blue/5 border border-primary-blue/20 rounded-full text-[10px] font-bold text-primary-blue uppercase tracking-widest">
            <Sparkles className="w-3 h-3" /> Curator-Selected Publications
          </span>

          {/* Main Title with fine tracking and serif-like italic emphasis */}
          <h2 className="font-display text-4xl md:text-7xl font-semibold text-text-primary leading-[1.15] tracking-tight">
            Discover Your Next <br />
            <span className="text-primary-blue italic font-light font-display">Favorite Masterpiece.</span>
          </h2>
          
          {/* Balanced responsive subtitle */}
          <p className="font-sans text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Unveiling a bespoke digital ecosystem of linen-bound typography, design notebooks, and high-fidelity tech references curated for creative professionals.
          </p>

          {/* Connected Search Bar & Button */}
          <div className="space-y-4 max-w-2xl mx-auto w-full pt-4">
            <form 
              onSubmit={handleSearchSubmit} 
              className="flex flex-col sm:flex-row items-center gap-3 w-full"
            >
              <div className="relative w-full group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-blue transition-colors w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by title, author, category, or keyword..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-xl border border-border-light bg-surface-card focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all outline-none text-sm text-text-primary shadow-sm placeholder:text-text-muted"
                />
              </div>
              
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-primary-blue hover:bg-primary-blue-container text-white rounded-xl font-display text-xs font-bold uppercase tracking-widest active:scale-95 transition-all shadow-md hover:shadow-lg whitespace-nowrap cursor-pointer"
              >
                Search Catalog
              </button>
            </form>

            {/* Quick-tags search suggestions */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
              <span className="text-text-muted">Suggestions:</span>
              {QUICK_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => onSearchHome(tag)}
                  className="px-3 py-1 bg-surface-soft hover:bg-surface-container border border-border-light rounded-md text-text-secondary hover:text-primary-blue transition-all cursor-pointer font-medium"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Bento Grid: Selected Curations / Trending Now */}
      <section className="space-y-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between border-b border-border-light pb-4">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-primary-blue uppercase tracking-widest font-bold block">
              Selected Curations
            </span>
            <h3 className="font-display text-3xl font-bold text-text-primary tracking-tight">
              Trending Now
            </h3>
          </div>
          <button 
            onClick={() => onNavigate('browse')}
            className="group flex items-center gap-1.5 text-primary-blue font-display text-xs font-bold tracking-wide hover:text-primary-blue-container transition-colors cursor-pointer"
          >
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Large Featured Card */}
          <div className="lg:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-soft aspect-[16/10] md:aspect-[16/9] shadow-md border border-border-light transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-103"
              style={{ backgroundImage: `url('${FEATURED_BOOK.image}')` }}
            ></div>
            
            {/* Dark editorial overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-10 text-white">
              
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 bg-primary-blue text-white rounded-full text-[9px] font-bold uppercase tracking-wider w-fit">
                  {FEATURED_BOOK.meta}
                </span>
                <span className="flex items-center gap-0.5 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="text-white text-[10px] ml-1 font-semibold">5.0 (96 reviews)</span>
                </span>
              </div>

              <h4 className="font-display text-2xl md:text-4xl font-bold mb-3 tracking-tight">
                {FEATURED_BOOK.title}
              </h4>
              <p className="text-white/80 text-xs md:text-sm max-w-xl mb-6 line-clamp-2 md:line-clamp-none font-sans leading-relaxed">
                {FEATURED_BOOK.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => onAddToCart(FEATURED_BOOK)}
                  className="bg-white text-black px-6 py-3 rounded-xl font-display text-xs font-bold hover:bg-neutral-100 active:scale-95 transition-all shadow-sm cursor-pointer"
                >
                  Purchase Hardcover • ₹{FEATURED_BOOK.price.toFixed(2)}
                </button>
                <button 
                  onClick={() => {
                    const digitalBook = { ...FEATURED_BOOK, title: `${FEATURED_BOOK.title} (Digital)`, price: 42.00, type: 'ebook' as const };
                    onAddToCart(digitalBook);
                  }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-display text-xs font-bold hover:bg-white/20 active:scale-95 transition-all cursor-pointer"
                >
                  Digital E-Book • ₹42.00
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Small Grid Items */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Card 1 */}
            <div className="flex-1 group relative overflow-hidden rounded-2xl bg-surface-soft shadow-sm border border-border-light aspect-[16/6] lg:aspect-auto min-h-[170px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuASIphM79AcrNUMvra5EdGEui-qs2WijDzQn4UtdI_MegOPefbvegWd4Ee1iBtpbKwHo-HcqTKwDPCPBTwnjpt2vaXLjFj61pE5Pb0BdpY88LNSImMFSw8babrDIAhp8UwzpKD0BGFo5UnIU2ur292QknxjjTij4t3jP1WP1Ind1usAVMugyNx6mN69qb_FlAsx66diS60cM6DS25qK7DPnAO5RBusvrGyYBcKF9ijNuOW7VLVLeCnstA')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-[9px] font-bold text-primary-blue-container uppercase tracking-wider mb-1">PRO BUNDLE</span>
                <h5 className="font-display text-lg font-bold tracking-tight">Digital Archive Access</h5>
                <p className="text-[10px] text-white/80 mt-1 font-sans leading-relaxed">Unlimited reference access to our premium digital bookstore catalog.</p>
                <button 
                  onClick={() => {
                    onNavigate('browse');
                  }} 
                  className="mt-3 text-left inline-flex items-center gap-1 text-[10px] font-bold text-primary-blue-container hover:underline cursor-pointer"
                >
                  Explore subscription option <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-1 group relative overflow-hidden rounded-2xl bg-surface-soft shadow-sm border border-border-light aspect-[16/6] lg:aspect-auto min-h-[170px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBr9ffW_g1FetlwFK6VQIX1xJY4p89_QLA-Cqi4BfvPzmkZQ9AGkx4-3bu61v3gRz-uY5om71KaHybXy6X_whfIwcsDMFT10lcm8F3iB_LDW65ImPVQFWDc2tteFz1SuAcpsp4m6gwCEoHPoMg2gOOd_7SZhox6YoVnTabBEpeeUhFyM9sQ67twlUIufS9pMnMbZy8ezunhtxEOzGUgXyXy_Xtyhfgu34rRsPVnVmC_18RUGV_dD4ba8g')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-6 flex flex-col justify-end text-white">
                <span className="text-[9px] font-bold text-primary-blue-container uppercase tracking-wider mb-1">COLLECTORS</span>
                <h5 className="font-display text-lg font-bold tracking-tight">Limited Print Runs</h5>
                <p className="text-[10px] text-white/80 mt-1 font-sans leading-relaxed">Exclusive artist collaborations and linen-bound physical gems on fine paper.</p>
                <button 
                  onClick={() => onNavigate('browse')}
                  className="mt-3 text-left inline-flex items-center gap-1 text-[10px] font-bold text-primary-blue-container hover:underline cursor-pointer"
                >
                  View Limited Editions <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Fresh Arrivals Horizontal Scroll */}
      <section className="bg-surface-soft px-6 md:px-12 py-12 rounded-2xl border border-border-light shadow-sm">
        
        <div className="mb-8 flex justify-between items-end">
          <div className="space-y-1">
            <span className="font-mono text-[10px] text-primary-blue uppercase tracking-widest font-bold block">
              Fresh Arrivals
            </span>
            <h3 className="font-display text-3xl font-bold text-text-primary tracking-tight">
              New Releases
            </h3>
          </div>
        </div>

        {/* Scrollable Book Row */}
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth book-3d-container">
          {newReleases.map((book) => (
            <div 
              key={book.id}
              className="min-w-[260px] md:min-w-[290px] flex-shrink-0 group snap-start bg-surface-card p-4 rounded-2xl border border-border-light shadow-sm hover:shadow-md transition-all duration-300 book-3d-card"
            >
              {/* 3D cover effect */}
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 shadow-md group-hover:shadow-lg transition-all">
                <div className="book-spine-overlay"></div>
                <div className="book-edge-overlay"></div>
                <img 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                  src={book.image}
                  alt={book.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />
                <span className="absolute top-3 right-3 bg-primary-blue text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                  NEW
                </span>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-display text-sm font-bold text-text-primary truncate group-hover:text-primary-blue transition-colors">
                  {book.title}
                </h4>
                
                <p className="text-xs text-text-muted font-sans truncate">
                  {book.author} • {book.category}
                </p>

                <div className="flex items-center gap-1 text-[10px] text-amber-500 font-semibold">
                  <span className="flex items-center gap-0.5">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  </span>
                  <span className="text-text-muted ml-1">4.9</span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border-light">
                  <span className="font-display text-sm font-bold text-primary-blue">
                    ₹{book.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => onAddToCart(book)}
                    className="text-[10px] font-display font-bold uppercase tracking-wider text-primary-blue hover:text-white border border-primary-blue/30 hover:bg-primary-blue px-3.5 py-1.5 rounded-lg transition-all active:scale-95 cursor-pointer"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Editor's Pick: Asymmetric layout */}
      <section className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-[10px] text-primary-blue uppercase tracking-widest font-bold block">
              Personal Recommendation
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-bold text-text-primary tracking-tight leading-tight">
              {RECOMMENDED_BOOK.title}
            </h3>
            
            <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed">
              {RECOMMENDED_BOOK.description}
            </p>

            {/* Editorial quote block */}
            <div className="p-6 bg-surface-soft border-l-4 border-primary-blue rounded-r-2xl italic text-text-secondary text-sm font-sans flex gap-4 shadow-sm">
              <Quote className="w-8 h-8 text-primary-blue/20 shrink-0" />
              <div>
                <p className="leading-relaxed">
                  "A masterclass in documenting the intangible art of our time. The layout reads like a dream and perfectly balances the visual logic. The browser has truly become our modern gallery canvas."
                </p>
                <span className="block mt-3 text-xs font-bold not-italic text-text-primary uppercase tracking-wide">
                  — Elena Sato, Chief Curator of Studio Verse
                </span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => onAddToCart(RECOMMENDED_BOOK)}
                className="px-8 py-3.5 bg-primary-blue hover:bg-primary-blue-container text-white rounded-xl font-display text-xs font-bold uppercase tracking-widest active:scale-95 transition-all shadow-md cursor-pointer"
              >
                Purchase Edition • ₹{RECOMMENDED_BOOK.price.toFixed(2)}
              </button>
            </div>
          </div>

          {/* Right Tablet Mockup Column */}
          <div className="lg:col-span-5 relative">
            {/* Subtle background card depth shadow */}
            <div className="absolute -top-4 -left-4 w-full h-full bg-primary-blue/5 rounded-2xl -z-10 translate-x-4 translate-y-4"></div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-border-light bg-surface-card p-3 max-w-sm mx-auto book-3d-container">
              <div className="relative rounded-xl overflow-hidden book-3d-card shadow-lg aspect-[3/4]">
                <div className="book-spine-overlay"></div>
                <div className="book-edge-overlay"></div>
                <img 
                  className="w-full h-full object-cover"
                  src={RECOMMENDED_BOOK.image}
                  alt="Recommended book cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
