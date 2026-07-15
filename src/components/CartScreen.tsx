import React, { useState } from 'react';
import { Bookmark, Trash2, ShieldCheck, CreditCard, Landmark, CheckCircle2, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { Book, CartItem, Order } from '../types';

const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'><rect width='100%' height='100%' fill='%23F0F6FA'/><text x='50%' y='50%' font-family='Georgia' font-style='italic' font-size='16' fill='%2373848E' text-anchor='middle'>Cover Unavailable</text></svg>";

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
  
  // Card payment form fields
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12 / 28');
  const [cvc, setCvc] = useState('345');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Promo Code States
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [appliedDiscount, setAppliedDiscount] = useState(0); // decimal percentage
  const [promoMsg, setPromoMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Cart Subtotal calculations
  const subtotal = cartItems.reduce((acc, item) => acc + (item.book.price * item.quantity), 0);
  const discountVal = subtotal * appliedDiscount;
  const subtotalAfterDiscount = subtotal - discountVal;
  const tax = parseFloat((subtotalAfterDiscount * 0.08).toFixed(2));
  const total = parseFloat((subtotalAfterDiscount + tax).toFixed(2));

  // Auto card type detection based on first digit
  const getCardType = (num: string) => {
    const cleanNum = num.replace(/\s+/g, '');
    if (cleanNum.startsWith('4')) return 'Visa';
    if (cleanNum.startsWith('5')) return 'Mastercard';
    if (cleanNum.startsWith('3')) return 'Amex';
    return 'Unknown';
  };

  // Card Number space-formatter
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, ''); // strip non-digits
    const limitedVal = rawVal.substring(0, 16); // max 16 digits
    const parts = [];
    for (let i = 0; i < limitedVal.length; i += 4) {
      parts.push(limitedVal.substring(i, i + 4));
    }
    setCardNumber(parts.join(' '));
  };

  // Card Expiry formatter (MM / YY)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '');
    const limitedVal = rawVal.substring(0, 4); // max 4 digits (MMYY)
    if (limitedVal.length > 2) {
      setExpiry(`${limitedVal.substring(0, 2)} / ${limitedVal.substring(2)}`);
    } else {
      setExpiry(limitedVal);
    }
  };

  // Handle Apply Promo Code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    
    if (code === 'SUMMER26') {
      setAppliedPromo('SUMMER26');
      setAppliedDiscount(0.15); // 15% discount
      setPromoMsg({ text: 'Promo SUMMER26 applied! 15% discount has been subtracted.', type: 'success' });
      setPromoCodeInput('');
    } else if (code === '') {
      setPromoMsg({ text: 'Please enter a valid code.', type: 'error' });
    } else {
      setPromoMsg({ text: 'Invalid promo code. Try "SUMMER26" for a 15% discount.', type: 'error' });
    }
  };

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
        subtotal: subtotalAfterDiscount,
        tax,
        total,
        shippingAddress: address || 'Default Address',
        paymentMethod: paymentMethod === 'Card' ? `${getCardType(cardNumber)} ending in ${cardNumber.slice(-4)}` : 'Apple Pay',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Pending'
      };
      
      onCheckoutSuccess(simulatedOrder);
      setIsSubmitting(false);
      
      // Clear promo code on successful order
      setAppliedPromo(null);
      setAppliedDiscount(0);
      setPromoMsg(null);
    }, 1500);
  };

  const cardType = getCardType(cardNumber);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-12 py-6 animate-fade-in">
      
      {/* Checkout Progress Stepper */}
      <section className="mb-10 max-w-2xl mx-auto">
        <div className="flex items-center justify-between relative">
          
          {/* Connector Line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[2px] bg-border-light -z-10"></div>
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-primary-blue transition-all duration-500 -z-10"
            style={{ width: cartItems.length > 0 ? '50%' : '0%' }}
          ></div>

          {/* Step 1: Review */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              cartItems.length >= 0 ? 'bg-primary-blue text-white ring-4 ring-primary-blue/15' : 'bg-surface-container text-text-muted'
            }`}>
              1
            </div>
            <span className="font-display text-[10px] uppercase tracking-wider font-bold mt-2 text-text-primary">
              Review Bag
            </span>
          </div>

          {/* Step 2: Details */}
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
              cartItems.length > 0 ? 'bg-primary-blue text-white ring-4 ring-primary-blue/15' : 'bg-surface-container text-text-muted'
            }`}>
              2
            </div>
            <span className="font-display text-[10px] uppercase tracking-wider font-bold mt-2 text-text-primary">
              Checkout Info
            </span>
          </div>

          {/* Step 3: Complete */}
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-surface-container text-text-muted transition-all">
              3
            </div>
            <span className="font-display text-[10px] uppercase tracking-wider font-bold mt-2 text-text-muted">
              Receipt
            </span>
          </div>

        </div>
      </section>

      {/* Page Title Header */}
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-5xl font-extrabold text-text-primary mb-2 tracking-tight">
          Your Collection
        </h2>
        <p className="font-sans text-sm text-text-muted leading-relaxed">
          Verify your item catalog and secure credentials below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Cart items and Cross Sell */}
        <div className="lg:col-span-8 space-y-8">
          
          {cartItems.length === 0 ? (
            <div className="bg-surface-soft border border-dashed border-border-light rounded-2xl p-16 text-center space-y-4">
              <div className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto text-text-muted shadow-sm">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-display text-lg font-bold text-text-primary">Your bag is empty</h4>
                <p className="text-xs text-text-muted max-w-sm mx-auto mt-1 leading-relaxed">
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
                  <div className="w-full md:w-28 h-36 flex-shrink-0 bg-surface-container rounded-xl overflow-hidden relative shadow-sm border border-border-light/40">
                    <div className="book-spine-overlay"></div>
                    <div className="book-edge-overlay"></div>
                    <img 
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                      src={item.book.image} 
                      alt={item.book.title} 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
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
                          ₹{(item.book.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="font-sans text-xs text-text-secondary mt-1">
                        {item.book.meta}
                      </p>
                    </div>

                    {/* Actions row: quantities & buttons */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                      
                      {/* Quantity Selector matching exact mockup */}
                      <div className="flex items-center bg-surface-card rounded-xl px-3 py-1 border border-border-light shadow-sm">
                        <button 
                          type="button"
                          onClick={() => {
                            if (item.quantity > 1) {
                              onUpdateQuantity(item.book.id, item.quantity - 1);
                            } else {
                              onRemoveItem(item.book.id);
                            }
                          }}
                          className="text-text-muted hover:text-primary-blue transition-colors text-sm font-bold px-1.5 py-0.5 cursor-pointer"
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
                          className="text-text-muted hover:text-primary-blue transition-colors text-sm font-bold px-1.5 py-0.5 cursor-pointer"
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
                          className="text-xs font-display font-semibold text-text-secondary hover:text-primary-blue flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Bookmark className="w-3.5 h-3.5" /> Save for later
                        </button>
                        
                        <button 
                          type="button"
                          onClick={() => onRemoveItem(item.book.id)}
                          className="text-xs font-display font-semibold text-error-red hover:text-error-red/80 flex items-center gap-1 transition-colors cursor-pointer"
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
            <div className="bg-surface-soft p-8 rounded-2xl border border-dashed border-border-light flex flex-col items-center text-center shadow-sm">
              <span className="material-symbols-outlined text-4xl text-primary-blue mb-3">auto_stories</span>
              <h4 className="font-display text-lg font-bold text-text-primary mb-1">
                Complement your collection
              </h4>
              <p className="font-sans text-xs text-text-secondary mb-6 max-w-md leading-relaxed">
                Readers of 'Modernism & Space' also enjoyed 'The Minimalist Manifesto'. Add it to your cart for an exclusive 10% discount.
              </p>
              
              <button 
                type="button"
                onClick={onAddCrossSell}
                className="px-6 py-2.5 border border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white font-display text-xs font-semibold rounded-xl transition-all duration-300 cursor-pointer"
              >
                Add Manifesto for ₹28.00
              </button>
            </div>
          )}

          {/* Saved for Later list */}
          {savedForLater.length > 0 && (
            <div className="pt-4 border-t border-border-light space-y-4">
              <h4 className="font-display text-sm font-bold text-text-primary tracking-tight">
                Saved for Later ({savedForLater.length})
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {savedForLater.map(book => (
                  <div key={book.id} className="p-4 bg-surface-soft border border-border-light rounded-xl flex gap-3 shadow-sm items-center">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-12 h-16 object-cover rounded shadow-sm shrink-0" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="font-display text-xs font-bold text-text-primary truncate">{book.title}</h5>
                      <p className="font-sans text-[10px] text-text-muted truncate">₹{book.price.toFixed(2)}</p>
                      
                      <div className="flex gap-2.5 mt-2">
                        <button
                          onClick={() => onMoveToCart(book)}
                          className="text-[10px] font-display font-semibold text-primary-blue hover:underline cursor-pointer"
                        >
                          Move to cart
                        </button>
                        <button
                          onClick={() => onRemoveSaved(book.id)}
                          className="text-[10px] font-display font-semibold text-error-red hover:underline cursor-pointer"
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
          <div className="bg-surface-soft border border-border-light p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="font-display text-lg font-bold text-text-primary border-b border-border-light pb-4">
              Order Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between font-sans text-xs text-text-secondary">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex justify-between font-sans text-xs text-success-green">
                  <span>15% Discount ({appliedPromo})</span>
                  <span className="font-semibold">-₹{discountVal.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-sans text-xs text-text-secondary">
                <span>Shipping</span>
                <span className="text-success-green font-medium">Free Delivery</span>
              </div>
              <div className="flex justify-between font-sans text-xs text-text-secondary">
                <span>Est. Tax (8%)</span>
                <span className="font-semibold">₹{tax.toFixed(2)}</span>
              </div>
              
              <div className="pt-4 border-t border-border-light flex justify-between items-center">
                <span className="font-display text-sm font-bold text-text-primary">Total</span>
                <span className="font-display text-lg font-bold text-primary-blue">
                  ₹{total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Promo Code Input Box */}
            <div className="pt-2 border-t border-border-light/60">
              <form onSubmit={handleApplyPromo} className="space-y-2">
                <label className="block font-display text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  Promotion Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={(e) => setPromoCodeInput(e.target.value)}
                    placeholder="Enter SUMMER26"
                    className="flex-1 bg-surface-card border border-border-light px-3 py-2 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue outline-none text-xs font-mono text-text-primary uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-blue hover:bg-primary-blue-container text-white text-xs font-bold rounded-xl active:scale-95 transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMsg && (
                  <p className={`text-[10px] font-sans leading-tight mt-1 ${
                    promoMsg.type === 'success' ? 'text-success-green' : 'text-error-red'
                  }`}>
                    {promoMsg.text}
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Checkout Form Card */}
          <div className="bg-surface-soft border border-border-light p-6 rounded-2xl shadow-sm">
            <h3 className="font-display text-lg font-bold text-text-primary mb-6">
              Quick Checkout
            </h3>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              
              {/* Shipping Address */}
              <div>
                <label className="block font-display text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-1">
                  Shipping Address
                </label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Luxury Lane, New York"
                  className="w-full bg-surface-card border border-border-light px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all font-sans text-xs text-text-primary outline-none"
                  required
                />
              </div>

              {/* Payment Method Selector with premium tabs */}
              <div className="pt-2">
                <label className="block font-display text-[10px] font-bold text-text-secondary uppercase tracking-wider mb-2">
                  Payment Method
                </label>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('Card')}
                    className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl transition-all cursor-pointer ${
                      paymentMethod === 'Card'
                        ? 'border-primary-blue bg-primary-blue/5'
                        : 'border-border-light opacity-60 hover:opacity-85 bg-surface-card'
                    }`}
                  >
                    <CreditCard className={`w-5 h-5 mb-1 ${paymentMethod === 'Card' ? 'text-primary-blue' : 'text-text-muted'}`} />
                    <span className={`font-display text-[10px] font-bold uppercase tracking-wider ${paymentMethod === 'Card' ? 'text-primary-blue' : 'text-text-secondary'}`}>
                      Credit Card
                    </span>
                  </button>
                  
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('Apple Pay')}
                    className={`flex flex-col items-center justify-center p-3 border-2 rounded-xl transition-all cursor-pointer ${
                      paymentMethod === 'Apple Pay'
                        ? 'border-primary-blue bg-primary-blue/5'
                        : 'border-border-light opacity-60 hover:opacity-85 bg-surface-card'
                    }`}
                  >
                    <Landmark className={`w-5 h-5 mb-1 ${paymentMethod === 'Apple Pay' ? 'text-primary-blue' : 'text-text-muted'}`} />
                    <span className={`font-display text-[10px] font-bold uppercase tracking-wider ${paymentMethod === 'Apple Pay' ? 'text-primary-blue' : 'text-text-secondary'}`}>
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
                      onChange={handleCardNumberChange}
                      placeholder="Card Number"
                      className="w-full bg-surface-card border border-border-light pl-4 pr-16 py-3 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all font-mono text-xs text-text-primary outline-none animate-fade-in"
                      required
                    />
                    {cardType !== 'Unknown' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 bg-primary-blue/10 border border-primary-blue/25 text-primary-blue rounded text-[9px] font-bold font-mono">
                        {cardType}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      value={expiry}
                      onChange={handleExpiryChange}
                      placeholder="MM / YY"
                      maxLength={7}
                      className="w-full bg-surface-card border border-border-light px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all font-mono text-xs text-text-primary outline-none"
                      required
                    />
                    <input 
                      type="password" 
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                      placeholder="CVC"
                      maxLength={4}
                      className="w-full bg-surface-card border border-border-light px-4 py-3 rounded-xl focus:ring-2 focus:ring-primary-blue/20 focus:border-primary-blue transition-all font-mono text-xs text-text-primary outline-none"
                      required
                    />
                  </div>
                </div>
              ) : (
                <div className="bg-surface-card p-4 rounded-xl text-center border border-border-light text-[10px] text-text-secondary font-sans leading-relaxed animate-fade-in">
                  Apple Pay is active. The default card associated with your Apple account will be securely billed upon order placement.
                </div>
              )}

              {/* Secure Seal & Place Order button */}
              <button 
                type="submit"
                disabled={isSubmitting || cartItems.length === 0}
                className="w-full bg-primary-blue hover:bg-primary-blue-container text-white py-3.5 rounded-xl font-display text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg active:scale-98 transition-all mt-6 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Authorizing secure funds...
                  </>
                ) : (
                  <>
                    Place Order
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[9px] font-mono text-text-muted mt-4 opacity-75">
                <ShieldCheck className="w-3.5 h-3.5 text-success-green" />
                <span>SECURE SSL 256-BIT ENCRYPTED TRANSACTION</span>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
