import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';
import HomeScreen from './components/HomeScreen';
import BrowseScreen from './components/BrowseScreen';
import CartScreen from './components/CartScreen';
import ProfileScreen from './components/ProfileScreen';

import { Book, CartItem, Order, UserProfile } from './types';
import { BOOKS, USER_PROFILE } from './data';
import { Sparkles, Check, X, ShieldCheck, BookOpen, AlertCircle, ShoppingCart, CheckCircle2 } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'browse' | 'cart' | 'profile'>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Initialize with exact mockup items to mirror the screenshot layout
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('cartItems');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to parse cart items:", e);
    }
    const book1 = BOOKS.find(b => b.id === 'b1'); // Modernism & Space
    const book2 = BOOKS.find(b => b.id === 'b2'); // The Digital Soul
    
    const initialList: CartItem[] = [];
    if (book1) {
      initialList.push({ book: book1, quantity: 1 });
    }
    if (book2) {
      initialList.push({ book: book2, quantity: 2 });
    }
    return initialList;
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const [savedForLater, setSavedForLater] = useState<Book[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['b10', 'b11']); // pre-fill a couple of wishlist items
  const [userProfile, setUserProfile] = useState<UserProfile>(USER_PROFILE);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Toast[]>([]);

  // Modals / Overlays
  const [showReceipt, setShowReceipt] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);
  
  const [showReader, setShowReader] = useState(false);
  const [readerBookTitle, setReaderBookTitle] = useState('');
  const [readerPage, setReaderPage] = useState(1);
  const [readerFontSize, setReaderFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [readerTheme, setReaderTheme] = useState<'ivory' | 'sepia' | 'dark'>('ivory');
  const [readerFontFamily, setReaderFontFamily] = useState<'serif' | 'sans'>('serif');

  // Helper to add toast notifications
  const triggerToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const newToast: Toast = {
      id: String(Date.now() + Math.random()),
      message,
      type
    };
    setNotifications(prev => [newToast, ...prev]);
  };

  // Auto-expire notifications after 4 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications(prev => prev.slice(0, prev.length - 1));
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [notifications]);

  // Cart operations
  const handleAddToCart = (book: Book) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.book.id === book.id);
      if (existing) {
        triggerToast(`Increased quantity of "${book.title}" in your collection.`);
        return prev.map(item => 
          item.book.id === book.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        triggerToast(`Added "${book.title}" to your collection.`);
        return [...prev, { book, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (bookId: string, quantity: number) => {
    setCartItems(prev => prev.map(item => 
      item.book.id === bookId ? { ...item, quantity } : item
    ));
  };

  const handleRemoveItem = (bookId: string) => {
    const item = cartItems.find(i => i.book.id === bookId);
    if (item) {
      setCartItems(prev => prev.filter(i => i.book.id !== bookId));
      triggerToast(`Removed "${item.book.title}" from your collection.`, 'info');
    }
  };

  const handleSaveForLater = (book: Book) => {
    setCartItems(prev => prev.filter(i => i.book.id !== book.id));
    setSavedForLater(prev => {
      if (prev.find(b => b.id === book.id)) return prev;
      return [...prev, book];
    });
    triggerToast(`Moved "${book.title}" to Saved for Later.`, 'success');
  };

  const handleMoveToCart = (book: Book) => {
    setSavedForLater(prev => prev.filter(b => b.id !== book.id));
    handleAddToCart(book);
  };

  const handleRemoveSaved = (bookId: string) => {
    setSavedForLater(prev => prev.filter(b => b.id !== bookId));
    triggerToast("Removed from saved for later list.", "info");
  };

  const handleToggleWishlist = (bookId: string) => {
    setWishlistIds(prev => {
      const exists = prev.includes(bookId);
      const book = BOOKS.find(b => b.id === bookId);
      const title = book ? book.title : 'Book';
      
      if (exists) {
        triggerToast(`Removed "${title}" from your wishlist.`, 'info');
        return prev.filter(id => id !== bookId);
      } else {
        triggerToast(`Saved "${title}" to your wishlist.`, 'success');
        return [...prev, bookId];
      }
    });
  };

  // Cross Sell triggers
  const handleAddCrossSell = () => {
    const crossSellBook = BOOKS.find(b => b.id === 'b3'); // The Minimalist Manifesto
    if (crossSellBook) {
      // 10% discount applied instantly
      const discountedBook = { ...crossSellBook, price: 28.00, meta: 'Premium Hardcover • 10% Bundle Discount Included' };
      handleAddToCart(discountedBook);
    }
  };

  const hasCrossSellInCart = cartItems.some(item => item.book.id === 'b3');

  // Navigate to Browse with search pre-filled
  const handleSearchHome = (query: string) => {
    setSearchQuery(query);
    setActiveTab('browse');
    triggerToast(`Searching for "${query}"`);
  };

  // Place Order Success handler
  const handleCheckoutSuccess = (order: Order) => {
    setLatestOrder(order);
    setOrders(prev => [order, ...prev]);
    
    // Increment Reward points based on total purchased
    const pointsGained = Math.round(order.total);
    setUserProfile(prev => {
      const nextPoints = prev.rewardPoints + pointsGained;
      let nextPointsToPlatinum = prev.pointsToNextTier - pointsGained;
      let status = prev.tierStatus;
      let nextT = prev.nextTier;
      
      if (nextPointsToPlatinum <= 0) {
        status = 'Platinum Bibliophile';
        nextT = 'Obsidian Bibliophile';
        nextPointsToPlatinum = 5000;
      }
      
      return {
        ...prev,
        booksRead: prev.booksRead + order.items.reduce((acc, item) => acc + item.quantity, 0),
        rewardPoints: nextPoints,
        tierStatus: status,
        nextTier: nextT,
        pointsToNextTier: Math.max(0, nextPointsToPlatinum)
      };
    });

    // Clear cart and reveal beautiful checkout success receipt overlay
    setCartItems([]);
    setShowReceipt(true);
    triggerToast(`Order placed successfully! Earned +${pointsGained} Reward Points.`, 'success');
  };

  // Simulated Reader/Course modal
  const handleOpenReader = (bookTitle: string) => {
    setReaderBookTitle(bookTitle);
    setReaderPage(1);
    setShowReader(true);
  };

  return (
    <div className="min-h-screen bg-bg-light text-text-primary flex flex-col font-sans transition-colors duration-300">
      
      {/* Top Translucent Navigation Bar */}
      <Header 
        activeTab={activeTab} 
        onNavigate={(tab) => {
          setActiveTab(tab);
          // Reset search query when navigating manually away from Browse
          if (tab !== 'browse') setSearchQuery('');
        }} 
        cartItems={cartItems}
        userAvatar={userProfile.avatar}
        onSearchHome={handleSearchHome}
      />

      {/* Main Interactive Screen Router */}
      <main className="flex-grow pt-20 pb-28 md:pb-12">
        {activeTab === 'home' && (
          <HomeScreen 
            onNavigate={setActiveTab} 
            onSearchHome={handleSearchHome} 
            onAddToCart={handleAddToCart}
          />
        )}
        
        {activeTab === 'browse' && (
          <BrowseScreen 
            initialSearchQuery={searchQuery}
            onAddToCart={handleAddToCart}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {activeTab === 'cart' && (
          <CartScreen 
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onSaveForLater={handleSaveForLater}
            savedForLater={savedForLater}
            onMoveToCart={handleMoveToCart}
            onRemoveSaved={handleRemoveSaved}
            onAddCrossSell={handleAddCrossSell}
            hasCrossSellInCart={hasCrossSellInCart}
            onCheckoutSuccess={handleCheckoutSuccess}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen 
            userProfile={userProfile}
            orders={orders}
            onOpenReader={handleOpenReader}
          />
        )}
      </main>

      {/* Global Interactive Editorial Footer */}
      <Footer />

      {/* Responsive Bottom Navigation Bar for Mobile Viewports */}
      <BottomNav 
        activeTab={activeTab} 
        onNavigate={setActiveTab} 
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />

      {/* Receipt Modal Overlay for checkout confirmation */}
      {showReceipt && latestOrder && (
        <div className="fixed inset-0 bg-text-primary/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-surface-card rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-border-light/60 my-8">
            <div className="bg-primary-blue p-6 text-white text-center relative">
              <button 
                onClick={() => setShowReceipt(false)}
                className="absolute right-4 top-4 text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors"
                title="Close receipt"
              >
                <X className="w-5 h-5" />
              </button>
              <CheckCircle2 className="w-12 h-12 mx-auto mb-2 text-white animate-pulse" />
              <h3 className="font-display text-xl font-bold">Secure Purchase Confirmed</h3>
              <p className="text-[11px] text-white/85 mt-1 font-mono uppercase tracking-wider">
                Receipt #{latestOrder.id}
              </p>
            </div>

            <div className="p-6 space-y-6">
              
              {/* Receipt metadata info */}
              <div className="grid grid-cols-2 gap-4 text-xs font-sans pb-4 border-b border-surface-container">
                <div>
                  <p className="text-text-muted">Purchased on</p>
                  <p className="font-bold mt-0.5">{latestOrder.date}</p>
                </div>
                <div>
                  <p className="text-text-muted">Payment Method</p>
                  <p className="font-bold mt-0.5">{latestOrder.paymentMethod}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-text-muted">Shipment Address</p>
                  <p className="font-bold mt-0.5 truncate">{latestOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Items checklist */}
              <div className="space-y-3">
                <p className="text-[11px] font-bold text-text-muted uppercase tracking-wider">
                  Acquired Works
                </p>
                
                <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                  {latestOrder.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs text-text-primary">
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] text-primary-blue bg-primary-blue/5 border border-primary-blue/15 px-1.5 py-0.5 rounded">
                          {String(item.quantity).padStart(2, '0')}
                        </span>
                        <span className="font-semibold truncate">{item.book.title}</span>
                      </div>
                      <span className="font-bold shrink-0">₹{(item.book.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reward stats received */}
              <div className="bg-primary-blue/5 border border-primary-blue/20 p-4 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-primary-blue animate-pulse" />
                  <div>
                    <p className="font-bold text-primary-blue">Reward Point Bonus Gained</p>
                    <p className="text-[10px] text-text-secondary mt-0.5">Your status progress has been updated!</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-primary-blue">
                  +{Math.round(latestOrder.total)} Pts
                </span>
              </div>

              {/* Totals index */}
              <div className="space-y-2 text-xs border-t border-surface-container pt-4">
                <div className="flex justify-between text-text-secondary">
                  <span>Subtotal</span>
                  <span>₹{latestOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Tax (8%)</span>
                  <span>₹{latestOrder.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-display text-base font-bold text-text-primary pt-1">
                  <span>Acquisition Total</span>
                  <span className="text-primary-blue">₹{latestOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setShowReceipt(false)}
                className="w-full bg-text-primary hover:bg-primary-blue text-white py-3 rounded-xl font-display text-xs font-bold transition-all mt-4"
              >
                Return to Library Dashboard
              </button>

            </div>
          </div>
        </div>
      )}
      {/* Interactive simulated book reader overlay */}
      {showReader && (() => {
        const bgClass = readerTheme === 'sepia' ? 'bg-[#f4ecd8] text-[#5c4033]' : readerTheme === 'dark' ? 'bg-[#181818] text-[#e2e2e2]' : 'bg-[#fdfbf7] text-[#1c1d1a]';
        const fontClass = readerFontFamily === 'serif' ? 'font-serif' : 'font-sans';
        const sizeClass = readerFontSize === 'sm' ? 'text-xs' : readerFontSize === 'lg' ? 'text-base md:text-lg' : 'text-sm md:text-base';
        
        return (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-surface-card rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-border-light flex flex-col h-[560px]">
              
              {/* Header bar */}
              <div className="bg-surface-container px-6 py-4 border-b border-border-light flex items-center justify-between">
                <div className="flex items-center gap-2 text-primary-blue">
                  <BookOpen className="w-5 h-5 animate-pulse" />
                  <span className="font-display text-xs font-bold uppercase tracking-wider">BookVerse Live e-Reader</span>
                </div>
                <button 
                  onClick={() => setShowReader(false)}
                  className="text-text-muted hover:text-text-primary p-1.5 hover:bg-surface-container-high rounded-full transition-colors cursor-pointer"
                  title="Exit reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Preferences Settings Bar */}
              <div className="bg-surface-soft px-6 py-2.5 border-b border-border-light/65 flex flex-wrap gap-4 items-center justify-between text-xs">
                
                {/* Font Family selector */}
                <div className="flex items-center gap-1 bg-surface-card rounded-lg p-0.5 border border-border-light shadow-sm">
                  <button
                    onClick={() => setReaderFontFamily('serif')}
                    className={`px-2.5 py-1 rounded font-serif font-bold cursor-pointer ${readerFontFamily === 'serif' ? 'bg-primary-blue text-white' : 'text-text-secondary hover:text-primary-blue'}`}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setReaderFontFamily('sans')}
                    className={`px-2.5 py-1 rounded font-sans font-bold cursor-pointer ${readerFontFamily === 'sans' ? 'bg-primary-blue text-white' : 'text-text-secondary hover:text-primary-blue'}`}
                  >
                    Sans
                  </button>
                </div>

                {/* Font Size controls */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Text Size:</span>
                  <div className="flex items-center bg-surface-card rounded-lg p-0.5 border border-border-light shadow-sm">
                    <button
                      onClick={() => setReaderFontSize('sm')}
                      className={`w-7 h-7 rounded flex items-center justify-center font-bold cursor-pointer ${readerFontSize === 'sm' ? 'bg-primary-blue text-white' : 'text-text-secondary hover:text-primary-blue'}`}
                      title="Small Text"
                    >
                      A-
                    </button>
                    <button
                      onClick={() => setReaderFontSize('md')}
                      className={`w-7 h-7 rounded flex items-center justify-center font-bold cursor-pointer ${readerFontSize === 'md' ? 'bg-primary-blue text-white' : 'text-text-secondary hover:text-primary-blue'}`}
                      title="Medium Text"
                    >
                      A
                    </button>
                    <button
                      onClick={() => setReaderFontSize('lg')}
                      className={`w-7 h-7 rounded flex items-center justify-center font-bold cursor-pointer ${readerFontSize === 'lg' ? 'bg-primary-blue text-white' : 'text-text-secondary hover:text-primary-blue'}`}
                      title="Large Text"
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* Background Theme toggle */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Paper:</span>
                  <div className="flex gap-1.5 items-center">
                    <button
                      onClick={() => setReaderTheme('ivory')}
                      className={`w-6 h-6 rounded-full bg-[#fdfbf7] border-2 shadow-sm cursor-pointer ${readerTheme === 'ivory' ? 'border-primary-blue' : 'border-neutral-300'}`}
                      title="Ivory"
                    ></button>
                    <button
                      onClick={() => setReaderTheme('sepia')}
                      className={`w-6 h-6 rounded-full bg-[#f4ecd8] border-2 shadow-sm cursor-pointer ${readerTheme === 'sepia' ? 'border-primary-blue' : 'border-neutral-300'}`}
                      title="Sepia"
                    ></button>
                    <button
                      onClick={() => setReaderTheme('dark')}
                      className={`w-6 h-6 rounded-full bg-[#181818] border-2 shadow-sm cursor-pointer ${readerTheme === 'dark' ? 'border-primary-blue' : 'border-neutral-600'}`}
                      title="Charcoal"
                    ></button>
                  </div>
                </div>

              </div>

              {/* Simulated reader canvas */}
              <div className={`p-8 flex-grow overflow-y-auto ${fontClass} ${sizeClass} ${bgClass} transition-colors duration-300 select-none space-y-4`}>
                <h3 className="font-display text-lg font-bold tracking-tight text-center border-b border-black/10 dark:border-white/10 pb-4 mb-4 not-serif text-text-secondary">
                  {readerBookTitle}
                </h3>

                {readerPage === 1 && (
                  <div className="space-y-4 leading-relaxed">
                    <p className="first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
                      The silence of space is not empty; it is structured. Each minimalist column, each clean white gap, and every aligned margin serves as an architectural waypoint. We look at modern layouts not to decorate, but to establish serene focal vectors.
                    </p>
                    <p>
                      To build for the digital intellectual, we must respect hierarchy. Let lines be thin and margins wide. Let the eye rest on empty canvases before introducing the weight of content. This balance represents the zenith of editorial design.
                    </p>
                  </div>
                )}

                {readerPage === 2 && (
                  <div className="space-y-4 leading-relaxed">
                    <p>
                      Form follows intention. When a user opens a page, they participate in an unspoken contract of trust. They seek comfort and readability. If typography is aggressive or clutter is loud, the contract is broken.
                    </p>
                    <p>
                      Therefore, let us pair Inter and Playfair. Let the display text represent the mathematical rigour of modern engineering, while long-form paragraphs represent the flowing tradition of classic prose. In this convergence, we find serenity.
                    </p>
                  </div>
                )}

                {readerPage === 3 && (
                  <div className="space-y-4 text-center py-10 font-sans">
                    <Check className="w-8 h-8 text-success-green mx-auto mb-2" />
                    <h4 className="font-display font-bold text-sm text-text-primary">Chapter Completed!</h4>
                    <p className="text-xs text-text-secondary mt-1">
                      Congratulations! You've successfully finished reading this module of "{readerBookTitle}".
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => {
                          setUserProfile(prev => ({ ...prev, rewardPoints: prev.rewardPoints + 25 }));
                          triggerToast("Earned +25 Reward Points for study completion!", "success");
                          setShowReader(false);
                        }}
                        className="px-6 py-2.5 bg-primary-blue text-white text-xs font-display font-semibold rounded-xl hover:bg-primary-blue-container transition-all cursor-pointer"
                      >
                        Collect Reward points
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer controls */}
              <div className="bg-surface-container px-6 py-3 border-t border-border-light flex items-center justify-between text-xs font-sans">
                <button 
                  onClick={() => setReaderPage(prev => Math.max(1, prev - 1))}
                  disabled={readerPage === 1}
                  className="px-3.5 py-1.5 bg-surface-card border border-border-light rounded-lg hover:bg-surface-soft disabled:opacity-40 disabled:cursor-not-allowed font-semibold cursor-pointer text-text-primary"
                >
                  Previous
                </button>
                
                <span className="text-text-muted">Page {readerPage} of 3</span>
                
                <button 
                  onClick={() => setReaderPage(prev => Math.min(3, prev + 1))}
                  disabled={readerPage === 3}
                  className="px-3.5 py-1.5 bg-primary-blue text-white rounded-lg hover:bg-primary-blue-container disabled:opacity-40 disabled:cursor-not-allowed font-semibold cursor-pointer"
                >
                  Next Page
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* Floating sliding Notifications / Toasts wrapper */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {notifications.map((toast) => (
          <div 
            key={toast.id}
            className="p-4 bg-text-primary text-white text-xs rounded-xl shadow-xl flex items-center justify-between gap-3 pointer-events-auto border border-white/10 animate-slide-in"
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' && <Sparkles className="w-4 h-4 text-primary-blue-container" />}
              {toast.type === 'info' && <BookOpen className="w-4 h-4 text-white" />}
              {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-error-red" />}
              <span className="font-medium font-sans leading-relaxed">{toast.message}</span>
            </div>
            <button 
              onClick={() => setNotifications(prev => prev.filter(n => n.id !== toast.id))}
              className="text-white/60 hover:text-white shrink-0 p-0.5 rounded-full hover:bg-white/10"
              title="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}
