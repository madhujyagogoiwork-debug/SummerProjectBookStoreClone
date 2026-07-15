import React, { useState } from 'react';
import { Bookmark, Trash2, ShieldCheck, CreditCard, Landmark, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Book, CartItem, Order } from '../types';

interface CartScreenProps {
  cartItems: CartItem[];
  onUpdateQuantity: (bookId: string, quantity: number) => void;
  onRemoveItem: (bookId: string) => void;
  onSaveForLater: (book: Book) => void;
  savedForLater: Book[];
  onMoveToCart: (book: Book) => void;
  onRemoveSaved: (bookId: string) => void;
  onAddCrossSell: () => void;
  hasCrossSellInCart: boolean;
  onCheckoutSuccess: (order: Order) => void;
}

export default function CartScreen({
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onSaveForLater,
  savedForLater,
  onMoveToCart,
  onRemoveSaved,
  onAddCrossSell,
  hasCrossSellInCart,
  onCheckoutSuccess
}: CartScreenProps) {
  const [address, setAddress] = useState('123 Luxury Lane, New York');
  const [paymentMethod, setPaymentMethod] = useState<'Card' | 'Apple Pay'>('Card');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12 / 28');
  const [cvc, setCvc] = useState('345');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Subtotal calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.book.price * item.quantity), 0);
  const tax = parseFloat((subtotal * 0.08).toFixed(2));
  const total = parseFloat((subtotal + tax).toFixed(2));

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate slight delay for luxury checkout feel
    setTimeout(() => {
      const simulatedOrder: Order = {
        id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
        items: cartItems.map(item => ({ book: item.book, quantity: item.quantity })),
        subtotal,
        tax,
        total,
        shippingAddress: address || 'Default Address',
        paymentMethod,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pending'
      };
      
      onCheckoutSuccess(simulatedOrder);
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 animate-fade-in">
      
      {/* Page Title Header */}
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-text-primary mb-2 tracking-tight">
          Your Collection
        </h2>
        <p className="font-sans text-sm text-text-muted leading-relaxed">
          Review your selections before finalizing your order.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart items and Cross Sell */}
        <div className="lg:col-span-8 space-y-8">
          
          {cartItems.length === 0 ? (
            <div className="bg-surface-soft border border-dashed border-border-light rounded-2xl p-12 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-text-muted mx-auto" />
              <div>
                <h4 className="font-display text-lg font-bold text-text-primary">Your bag is empty</h4>
                <p className="text-xs text-text-muted max-w-sm mx-auto mt-1">
                  Explore our selection of premium curated editions and start adding masterpieces to your collection.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div 
                  key={item.book.id}
                  className="flex flex-col md:flex-row gap-6 p-6 bg-surface-soft border border-border-light rounded-2xl group transition-all duration-300 hover:shadow-md"
                >
                  {/* Book cover wrapper */}
                  <div className="w-full md:w-28 h-40 flex-shrink-0 bg-surface-container rounded-lg overflow-hidden relative shadow-sm border border-surface-container-high">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      src={item.book.image} 
                      alt={item.book.title} 
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Book details & actions */}
                  <div className="flex-grow flex flex-col justify-between py-1">
                    <div>
                      <div className="flex justify-between items-start gap-4">
                        <h3 className="font-display text-base font-bold text-text-primary leading-snug">
                          {item.book.title}
                        </h3>
                        <p className="font-display text-base font-bold text-primary-blue whitespace-nowrap">
                          ${(item.book.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="font-sans text-xs text-text-secondary mt-1">
                        {item.book.meta}
                      </p>
                    </div>

                    {/* Actions row: quantities & buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                      
                      {/* Quantity Selector matching exact mockup */}
                      <div className="flex items-center bg-surface-container rounded-full px-3 py-1 border border-border-light shadow-sm">
                        <button 
                          type="button"
                          onClick={() => {
                            if (item.quantity > 1) {
                              onUpdateQuantity(item.book.id, item.quantity - 1);
                            } else {
                              onRemoveItem(item.book.id);
                            }
                          }}
                          className="text-text-muted hover:text-primary-blue transition-colors text-sm font-bold px-1 py-0.5"
                          title="Decrease Quantity"
                        >
                          —
                        </button>
                        
                        <span className="px-4 font-mono text-xs font-semibold text-text-primary">
                          {String(item.quantity).padStart(2, '0')}
                        </span>
                        
                        <button 
                          type="button"
                          onClick={() => onUpdateQuantity(item.book.id, item.quantity + 1)}
                          className="text-text-muted hover:text-primary-blue transition-colors text-sm font-bold px-1 py-0.5"
                          title="Increase Quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Action links */}
                      <div className="flex gap-4">
                        <button 
                          type="button"
                          onClick={() => onSaveForLater(item.book)}
                          className="text-xs font-display font-medium text-text-secondary hover:text-primary-blue flex items-center gap-1 transition-colors"
                        >
                          <Bookmark className="w-3.5 h-3.5" /> Save for later
                        </button>
                        
                        <button 
                          type="button"
                          onClick={() => onRemoveItem(item.book.id)}
                          className="text-xs font-display font-medium text-error-red hover:text-error-red/80 flex items-center gap-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Cross Sell Box matching exact mockup specifications */}
          {!hasCrossSellInCart && (
            <div className="bg-surface-container-low p-8 rounded-2xl border border-dashed border-border-light flex flex-col items-center text-center shadow-sm">
              <span className="material-symbols-outlined text-4xl text-text-muted mb-3">auto_stories</span>
              <h4 className="font-display text-lg font-bold text-text-primary mb-1">
                Complement your collection
              </h4>
              <p className="font-sans text-xs text-text-secondary mb-6 max-w-md leading-relaxed">
                Readers of 'Modernism & Space' also enjoyed 'The Minimalist Manifesto'. Add it to your cart for an exclusive 10% discount.
              </p>
              
              <button 
                type="button"
                onClick={onAddCrossSell}
                className="px-6 py-2 border border-primary-blue text-primary-blue font-display text-xs font-semibold rounded-full hover:bg-primary-blue hover:text-white transition-all duration-300"
              >
                Add for $28.00
              </button>
            </div>
          )}

          {/* Saved for Later list */}
          {savedForLater.length > 0 && (
            <div className="pt-4 border-t border-surface-container space-y-4">
              <h4 className="font-display text-sm font-bold text-text-primary tracking-tight">
                Saved for Later ({savedForLater.length})
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedForLater.map(book => (
                  <div key={book.id} className="p-4 bg-surface-card border border-border-light rounded-xl flex gap-3 shadow-sm items-center">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-12 h-16 object-cover rounded shadow-sm shrink-0" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-display text-xs font-bold text-text-primary truncate">{book.title}</h5>
                      <p className="font-sans text-[10px] text-text-muted truncate">${book.price.toFixed(2)}</p>
                      
                      <div className="flex gap-2 mt-1.5">
                        <button
                          onClick={() => onMoveToCart(book)}
                          className="text-[10px] font-display font-semibold text-primary-blue hover:underline"
                        >
                          Move to cart
                        </button>
                        <button
                          onClick={() => onRemoveSaved(book.id)}
                          className="text-[10px] font-display font-semibold text-error-red hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column: Order Summary & Checkout Form */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Order Summary Card */}
          <div className="bg-surface-card border border-border-light p-6 rounded-2xl shadow-sm">
            <h3 className="font-display text-lg font-bold text-text-primary mb-6 border-b border-surface-container pb-4">
              Order Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between font-sans text-xs text-text-secondary">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-sans text-xs text-text-secondary">
                <span>Shipping</span>
                <span className="text-success-green font-medium">Free</span>
              </div>
              <div className="flex justify-between font-sans text-xs text-text-secondary">
                <span>Est. Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 border-t border-surface-container flex justify-between items-center">
                <span className="font-display text-sm font-bold text-text-primary">Total</span>
                <span className="font-display text-lg font-bold text-primary-blue">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Checkout Form Card */}
          <div className="bg-surface-card border border-border-light p-6 rounded-2xl shadow-sm">
            <h3 className="font-display text-base font-bold text-text-primary mb-6">
              Quick Checkout
            </h3>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* Shipping Address */}
              <div>
                <label className="block font-display text-[11px] font-semibold text-text-secondary mb-1 ml-1">
                  Shipping Address
                </label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Luxury Lane, New York"
                  className="w-full bg-surface-soft border border-border-light px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all font-sans text-xs text-text-primary outline-none"
                  required
                />
              </div>

              {/* Payment Method Selector with premium tabs */}
              <div className="pt-2">
                <label className="block font-display text-[11px] font-semibold text-text-secondary mb-2 ml-1">
                  Payment Method
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl transition-all ${
                      paymentMethod === 'Card'
                        ? 'border-primary-blue bg-primary-blue/5'
                        : 'border-border-light opacity-60 hover:opacity-80'
                    }`}
                  >
                    <CreditCard className={`w-5 h-5 mb-1 ${paymentMethod === 'Card' ? 'text-primary-blue' : 'text-text-muted'}`} />
                    <span className={`font-display text-[10px] font-bold ${paymentMethod === 'Card' ? 'text-primary-blue' : 'text-text-secondary'}`}>
                      Card
                    </span>
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('Apple Pay')}
                    className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl transition-all ${
                      paymentMethod === 'Apple Pay'
                        ? 'border-primary-blue bg-primary-blue/5'
                        : 'border-border-light opacity-60 hover:opacity-80'
                    }`}
                  >
                    <Landmark className={`w-5 h-5 mb-1 ${paymentMethod === 'Apple Pay' ? 'text-primary-blue' : 'text-text-muted'}`} />
                    <span className={`font-display text-[10px] font-bold ${paymentMethod === 'Apple Pay' ? 'text-primary-blue' : 'text-text-secondary'}`}>
                      Apple Pay
                    </span>
                  </button>
                </div>
              </div>

              {/* Card Number fields */}
              {paymentMethod === 'Card' ? (
                <div className="space-y-3 pt-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="w-full bg-surface-soft border border-border-light pl-4 pr-12 py-2.5 rounded-xl focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all font-mono text-xs text-text-primary outline-none"
                      required
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                      <div className="w-5 h-3.5 bg-text-muted/30 rounded-sm"></div>
                      <div className="w-5 h-3.5 bg-primary-blue/30 rounded-sm"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="MM / YY"
                      className="w-full bg-surface-soft border border-border-light px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all font-mono text-xs text-text-primary outline-none"
                      required
                    />
                    <input 
                      type="password" 
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="CVC"
                      maxLength={4}
                      className="w-full bg-surface-soft border border-border-light px-4 py-2.5 rounded-xl focus:ring-2 focus:ring-primary-blue/30 focus:border-primary-blue transition-all font-mono text-xs text-text-primary outline-none"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-surface-container-low p-4 rounded-xl text-center border border-border-light text-[11px] text-text-secondary font-sans leading-relaxed">
                  Apple Pay is selected. We will automatically use your default Apple account billing profile upon clicking "Place Order".
                </div>
              )}

              {/* Secure Seal & Place Order button */}
              <button 
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full bg-primary-blue hover:bg-primary-blue-container text-white py-3.5 rounded-full font-display text-xs font-bold shadow-md hover:shadow-lg active:scale-98 transition-all mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Authorizing Secure Payment...' : 'Place Order'} 
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-text-muted mt-4 opacity-75">
                <ShieldCheck className="w-3.5 h-3.5 text-success-green" />
                <span>SECURE SSL ENCRYPTED PAYMENT</span>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
