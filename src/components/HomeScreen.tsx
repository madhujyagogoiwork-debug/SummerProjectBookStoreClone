import React, { useState } from 'react';
import { ArrowRight, Search, BookOpen, Quote, Sparkles } from 'lucide-react';
import { Book } from '../types';
import { BOOKS, FEATURED_BOOK, RECOMMENDED_BOOK } from '../data';

interface HomeScreenProps {
  onNavigate: (tab: 'home' | 'browse' | 'cart' | 'profile') => void;
  onSearchHome: (query: string) => void;
  onAddToCart: (book: Book) => void;
}

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
    <div className="space-y-16 max-w-7xl mx-auto px-4 md:px-12 py-10 animate-fade-in">
      
      {/* Hero Section */}
      <section className="relative min-h-[500px] md:min-h-[580px] flex flex-col items-center justify-center text-center overflow-hidden py-16">
        
        {/* Ambient absolute decorative glow elements to match premium aesthetic */}
        <div className="absolute inset-0 -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-blue/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-primary-blue-container/5 rounded-full filter blur-3xl"></div>
        </div>

        <div className="max-w-4xl space-y-8">
          
          {/* Main Title with fine tracking and serif-like italic emphasis */}
          <h2 className="font-display text-4xl md:text-6xl font-semibold text-text-primary leading-[1.1] tracking-tight">
            Discover Your Next <br />
            <span className="text-primary-blue italic font-light">Favorite Book.</span>
          </h2>
          
          {/* Balanced responsive subtitle */}
          <p className="font-sans text-sm md:text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Curating a premium selection of high-end luxury editions and precision-crafted digital reading experiences for the modern intellectual.
          </p>

          {/* Connected Search Bar & Button */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-2xl mx-auto w-full"
          >
            <div className="relative w-full group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary-blue transition-colors w-5 h-5" />
              <input
                type="text"
                placeholder="Search by title, author, or genre..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                className="w-full pl-14 pr-6 py-4 rounded-full border border-border-light bg-surface-card focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all outline-none text-sm text-text-primary shadow-sm placeholder:text-text-muted"
              />
            </div>
            
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 bg-primary-blue text-white rounded-full font-display text-xs font-semibold uppercase tracking-widest hover:bg-primary-blue-container active:scale-95 transition-all shadow-md hover:shadow-lg whitespace-nowrap"
            >
              Search Catalog
            </button>
          </form>

          {/* Quick Navigate shortcut */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onNavigate('browse')}
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary-blue hover:text-primary-blue-container group transition-colors"
            >
              Or Browse Collections <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

      {/* Bento Grid: Selected Curations / Trending Now */}
      <section className="space-y-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between border-b border-surface-container pb-4">
          <div className="space-y-1">
            <span className="font-mono text-[11px] text-primary-blue uppercase tracking-widest font-semibold block">
              Selected Curations
            </span>
            <h3 className="font-display text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
              Trending Now
            </h3>
          </div>
          <button 
            onClick={() => onNavigate('browse')}
            className="group flex items-center gap-1.5 text-primary-blue font-display text-xs font-semibold tracking-wide hover:text-primary-blue-container transition-colors"
          >
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Large Featured Card */}
          <div className="lg:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-soft aspect-[16/10] md:aspect-[16/9] shadow-md border border-surface-container-low transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${FEATURED_BOOK.image}')` }}
            ></div>
            
            {/* Dark editorial overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-text-primary/95 via-text-primary/45 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
              <span className="px-3 py-1 bg-primary-blue/35 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit mb-3">
                {FEATURED_BOOK.meta}
              </span>
              <h4 className="font-display text-xl md:text-3xl font-extrabold mb-2 tracking-tight">
                {FEATURED_BOOK.title}
              </h4>
              <p className="text-white/85 text-xs md:text-sm max-w-lg mb-6 line-clamp-2 md:line-clamp-none font-sans leading-relaxed">
                {FEATURED_BOOK.description}
              </p>
              
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => onAddToCart(FEATURED_BOOK)}
                  className="bg-white text-text-primary px-6 py-2.5 rounded-lg font-display text-xs font-semibold hover:bg-bg-light active:scale-95 transition-all shadow-sm"
                >
                  Purchase Physical • ${FEATURED_BOOK.price.toFixed(2)}
                </button>
                <button 
                  onClick={() => {
                    const digitalBook = { ...FEATURED_BOOK, title: `${FEATURED_BOOK.title} (Digital)`, price: 42.00, type: 'ebook' as const };
                    onAddToCart(digitalBook);
                  }}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-lg font-display text-xs font-semibold hover:bg-white/20 active:scale-95 transition-all"
                >
                  Digital Edition • $42.00
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Small Grid Items */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Card 1 */}
            <div className="flex-1 group relative overflow-hidden rounded-2xl bg-surface-soft shadow-sm border border-surface-container-low aspect-[16/6] lg:aspect-auto min-h-[160px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuASIphM79AcrNUMvra5EdGEui-qs2WijDzQn4UtdI_MegOPefbvegWd4Ee1iBtpbKwHo-HcqTKwDPCPBTwnjpt2vaXLjFj61pE5Pb0BdpY88LNSImMFSw8babrDIAhp8UwzpKD0BGFo5UnIU2ur292QknxjjTij4t3jP1WP1Ind1usAVMugyNx6mN69qb_FlAsx66diS60cM6DS25qK7DPnAO5RBusvrGyYBcKF9ijNuOW7VLVLeCnstA')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/40 to-transparent p-6 flex flex-col justify-end text-white">
                <h5 className="font-display text-base font-bold tracking-tight">Digital Archive Access</h5>
                <p className="text-[11px] text-white/80 mt-1 font-sans">Unlimited reference access to our technology catalog.</p>
                <button 
                  onClick={() => {
                    alert("This is a premium bundle. We've redirected you to the catalog!");
                    onNavigate('browse');
                  }} 
                  className="mt-3 text-left inline-flex items-center gap-1 text-[10px] font-bold text-primary-blue-container hover:underline"
                >
                  Explore subscription option <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex-1 group relative overflow-hidden rounded-2xl bg-surface-soft shadow-sm border border-surface-container-low aspect-[16/6] lg:aspect-auto min-h-[160px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBr9ffW_g1FetlwFK6VQIX1xJY4p89_QLA-Cqi4BfvPzmkZQ9AGkx4-3bu61v3gRz-uY5om71KaHybXy6X_whfIwcsDMFT10lcm8F3iB_LDW65ImPVQFWDc2tteFz1SuAcpsp4m6gwCEoHPoMg2gOOd_7SZhox6YoVnTabBEpeeUhFyM9sQ67twlUIufS9pMnMbZy8ezunhtxEOzGUgXyXy_Xtyhfgu34rRsPVnVmC_18RUGV_dD4ba8g')` }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-text-primary/90 via-text-primary/40 to-transparent p-6 flex flex-col justify-end text-white">
                <h5 className="font-display text-base font-bold tracking-tight">Limited Print Runs</h5>
                <p className="text-[11px] text-white/80 mt-1 font-sans">Exclusive artist collaborations and linen bound physical gems.</p>
                <button 
                  onClick={() => onNavigate('browse')}
                  className="mt-3 text-left inline-flex items-center gap-1 text-[10px] font-bold text-primary-blue-container hover:underline"
                >
                  View Limited Editions <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Fresh Arrivals Horizontal Scroll */}
      <section className="bg-surface-container-low -mx-4 md:-mx-12 px-4 md:px-12 py-12 rounded-2xl border border-surface-container">
        
        <div className="mb-8">
          <span className="font-mono text-[11px] text-primary-blue uppercase tracking-widest font-semibold block mb-1">
            Fresh Arrivals
          </span>
          <h3 className="font-display text-2xl md:text-3xl font-extrabold text-text-primary tracking-tight">
            New Releases
          </h3>
        </div>

        {/* Scrollable Book Row */}
        <div className="flex gap-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth">
          {newReleases.map((book) => (
            <div 
              key={book.id}
              className="min-w-[260px] md:min-w-[300px] flex-shrink-0 group snap-start bg-surface-card p-4 rounded-xl border border-surface-container-high shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-4 shadow-sm group-hover:shadow-md transition-all">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={book.image}
                  alt={book.title}
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 right-3 bg-primary-blue text-white text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-sm">
                  NEW
                </span>
              </div>
              
              <div className="space-y-1">
                <h4 className="font-display text-sm font-bold text-text-primary truncate group-hover:text-primary-blue transition-colors">
                  {book.title}
                </h4>
                <p className="text-xs text-text-muted font-sans truncate">
                  {book.author} • {book.category}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <span className="font-display text-sm font-bold text-primary-blue">
                    ${book.price.toFixed(2)}
                  </span>
                  
                  <button
                    onClick={() => onAddToCart(book)}
                    className="text-[11px] font-display font-semibold text-primary-blue border border-primary-blue/20 hover:bg-primary-blue hover:text-white px-3 py-1 rounded transition-all active:scale-95"
                  >
                    + Add to Cart
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
            <span className="font-mono text-[11px] text-primary-blue uppercase tracking-widest font-semibold block">
              Personal Recommendation
            </span>
            <h3 className="font-display text-2xl md:text-4xl font-extrabold text-text-primary tracking-tight">
              {RECOMMENDED_BOOK.title}
            </h3>
            
            <p className="font-sans text-text-secondary text-sm md:text-base leading-relaxed">
              {RECOMMENDED_BOOK.description}
            </p>

            {/* Editorial quote block */}
            <div className="p-6 bg-surface-container-low border-l-4 border-primary-blue rounded-r-xl italic text-text-secondary text-sm font-sans flex gap-3 shadow-sm">
              <Quote className="w-8 h-8 text-primary-blue/30 shrink-0" />
              <div>
                <p className="leading-relaxed">
                  "A masterclass in documenting the intangible art of our time. The layout reads like a dream and perfectly balances the visual logic."
                </p>
                <span className="block mt-2 text-xs font-semibold not-italic text-text-primary">
                  — Elena Sato, Chief Curator of Studio Verse
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onAddToCart(RECOMMENDED_BOOK)}
                className="px-8 py-3 bg-text-primary text-white rounded-lg font-display text-xs font-semibold hover:bg-primary-blue active:scale-95 transition-all shadow-md"
              >
                Explore Digital Edition • ${RECOMMENDED_BOOK.price.toFixed(2)}
              </button>
            </div>
          </div>

          {/* Right Tablet Mockup Column */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Subtle background card depth shadow */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-primary-blue-container/10 rounded-2xl -z-10 translate-x-4 translate-y-4"></div>
              
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-surface-container-highest bg-surface-card p-2">
                <img 
                  className="w-full h-auto rounded-xl"
                  src={RECOMMENDED_BOOK.image}
                  alt="Digital library mockup tablet"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
