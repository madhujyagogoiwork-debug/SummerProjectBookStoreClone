import React, { useState } from 'react';
import { Award, ShieldCheck, Download, Settings, History, ChevronLeft, ChevronRight, Check, X, FileText, Flame, BookOpen, Star } from 'lucide-react';
import { UserProfile, Order } from '../types';
import { RECENT_ORDERS, CONTINUE_READING_ITEMS, WISHLIST_BOOKS } from '../data';

const PLACEHOLDER_IMAGE = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'><rect width='100%' height='100%' fill='%23F0F6FA'/><text x='50%' y='50%' font-family='Georgia' font-style='italic' font-size='16' fill='%2373848E' text-anchor='middle'>Cover Unavailable</text></svg>";

interface ProfileScreenProps {
  userProfile: UserProfile;
  orders: Order[];
  onOpenReader: (bookTitle: string) => void;
}

const PREMIUM_ACHIEVEMENTS = [
  { id: 'ach1', title: 'Minimalist Scholar', desc: 'Read 5+ books on Design Philosophy', unlocked: true, icon: 'Palette' },
  { id: 'ach2', title: 'Tech Vanguard', desc: 'Completed 3 courses or tech books', unlocked: true, icon: 'Cpu' },
  { id: 'ach3', title: 'Gold Collector', desc: 'Attained Gold Bibliophile status tier', unlocked: true, icon: 'ShieldCheck' },
  { id: 'ach4', title: 'Obsidian Bibliophile', desc: 'Read 250+ books to unlock obsidian tier', unlocked: false, icon: 'Sparkles' },
];

export default function ProfileScreen({ userProfile, orders, onOpenReader }: ProfileScreenProps) {
  const [activeSidebarTab, setActiveSidebarTab] = useState<'activity' | 'downloads' | 'settings'>('activity');
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [yearlyGoal, setYearlyGoal] = useState(150);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [goalInput, setGoalInput] = useState('150');

  // Combine default static orders with dynamic successful checkout orders
  const allOrdersList = [
    ...orders.map(o => ({
      id: o.id,
      bookTitle: o.items[0]?.book.title || 'Curated Book Bundle',
      bookType: o.items.length > 1 ? `${o.items.length} Curated Items` : o.items[0]?.book.meta || 'Collector Edition',
      bookImage: o.items[0]?.book.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuCQFV8j_fcTnOtJx9o1HG0iMFuNjn0Vly5ooJq3gm0vtzRpryi9ID5DbnY-mo251Lz31yarby2jjaGIms_v5VtiG3YfJrj1XjjhLp3XcVLIGr3qfvs_7ULiWoB4cGVZ6YmoccOVfHcBVqUQdn1uLMlAQfYPbbNF0Ht7nT-H5vk_zt9_y7oQlpRGXDs6pF_a_H2UKn5Vjr4GUHRf1iej2avEPz7jW8anQdpAw-VzKBqzc4iuuBdxc5kVHQ',
      date: o.date,
      status: 'Pending' as const,
      price: o.total
    })),
    ...RECENT_ORDERS
  ];

  // Calculate goal percentage
  const goalPercentage = Math.min(100, Math.round((userProfile.booksRead / yearlyGoal) * 100));

  const handleUpdateGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(goalInput);
    if (!isNaN(val) && val > 0) {
      setYearlyGoal(val);
      setIsEditingGoal(false);
    }
  };

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 md:px-12 py-6 animate-fade-in">
      
      {/* Profile Header Bento structure */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Julian Thorne User Badge Card */}
        <div className="lg:col-span-2 bg-surface-soft p-6 md:p-8 rounded-2xl border border-border-light flex flex-col sm:flex-row gap-6 items-center sm:items-start shadow-sm">
          
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-md border-2 border-primary-blue/20 shrink-0">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                className="w-full h-full object-cover animate-fade-in"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Verified badge style checkmark matching mockup icon */}
            <div className="absolute -bottom-1.5 -right-1.5 bg-primary-blue text-white p-1.5 rounded-full shadow-md border-2 border-surface-card">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>

          <div className="text-center sm:text-left flex-1 space-y-4">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-center sm:justify-start">
                <h2 className="font-display text-2xl font-bold text-text-primary tracking-tight">
                  {userProfile.name}
                </h2>
                <span className="px-2.5 py-0.5 bg-primary-blue/10 text-primary-blue border border-primary-blue/20 text-[9px] font-bold uppercase tracking-wider rounded-md w-fit mx-auto sm:mx-0">
                  {userProfile.tierStatus}
                </span>
              </div>
              <p className="font-sans text-xs text-text-secondary font-semibold mt-1">
                {userProfile.role}
              </p>
            </div>

            {/* Read Count and reward stats */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-4 pt-2">
              <div className="bg-surface-card px-5 py-2.5 rounded-xl border border-border-light text-center sm:text-left shadow-sm min-w-[120px]">
                <p className="font-display text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  Books Read
                </p>
                <p className="font-display text-2xl font-extrabold text-primary-blue mt-0.5">
                  {userProfile.booksRead}
                </p>
              </div>
              
              <div className="bg-surface-card px-5 py-2.5 rounded-xl border border-border-light text-center sm:text-left shadow-sm min-w-[120px]">
                <p className="font-display text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  Reward Points
                </p>
                <p className="font-display text-2xl font-extrabold text-primary-blue mt-0.5">
                  {userProfile.rewardPoints.toLocaleString()}
                </p>
              </div>

              {/* 12 Day Streak Badge */}
              <div className="bg-surface-card px-5 py-2.5 rounded-xl border border-border-light text-center sm:text-left shadow-sm min-w-[120px] flex items-center justify-center sm:justify-start gap-2.5">
                <Flame className="w-6 h-6 text-amber-500 animate-bounce" />
                <div>
                  <p className="font-display text-[9px] font-bold text-text-muted uppercase tracking-wider">
                    Reading Streak
                  </p>
                  <p className="font-display text-base font-extrabold text-text-primary">
                    12 Days
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Tier status progress card matching blue visual mockup */}
        <div className="bg-primary-blue text-white p-6 md:p-8 rounded-2xl flex flex-col justify-between shadow-lg relative overflow-hidden">
          
          {/* Subtle graphical background pattern */}
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
          
          <div className="relative z-10 space-y-2">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/80 font-bold">
              TIER STATUS PROGRESS
            </p>
            <h3 className="font-display text-2xl font-extrabold tracking-tight">
              {userProfile.tierStatus}
            </h3>
            <p className="font-sans text-xs text-white/90 mt-2 leading-relaxed">
              You are {userProfile.pointsToNextTier} points away from the Obsidian Bibliophile tier. Keep reading to unlock print edition discounts.
            </p>
          </div>

          <div className="relative z-10 pt-6">
            {/* Progress bar matching 75% complete */}
            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000" 
                style={{ width: '75%' }}
              ></div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] font-medium text-white/80 mt-2">
              <span>75% to Next Tier</span>
              <span className="uppercase tracking-wider font-bold">Gold Tier</span>
            </div>
          </div>

        </div>

      </section>

      {/* Main Content Area: Sidebar on desktop, Grid on right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar controls (Hidden on mobile, layout bento on desktop) */}
        <aside className="hidden lg:flex flex-col gap-6">
          
          {/* Quick Access Menu */}
          <div className="bg-surface-soft p-5 rounded-2xl border border-border-light shadow-sm">
            <h4 className="font-display text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">
              Quick Access
            </h4>
            
            <div className="flex flex-col gap-1.5">
              <button 
                onClick={() => {
                  setActiveSidebarTab('activity');
                  alert('Recent Activity log is active.');
                }}
                className={`flex items-center gap-3 p-2.5 rounded-lg text-left transition-all text-xs font-semibold cursor-pointer ${
                  activeSidebarTab === 'activity' ? 'bg-primary-blue/10 text-primary-blue' : 'text-text-secondary hover:bg-surface-container'
                }`}
              >
                <History className="w-4 h-4 shrink-0" />
                <span>Recent Activity</span>
              </button>

              <button 
                onClick={() => {
                  setActiveSidebarTab('downloads');
                  alert("Opening downloads directory. You've unlocked 4 luxury e-book PDFs.");
                }}
                className={`flex items-center gap-3 p-2.5 rounded-lg text-left transition-all text-xs font-semibold cursor-pointer ${
                  activeSidebarTab === 'downloads' ? 'bg-primary-blue/10 text-primary-blue' : 'text-text-secondary hover:bg-surface-container'
                }`}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Downloads</span>
              </button>

              <button 
                onClick={() => {
                  setActiveSidebarTab('settings');
                  const val = prompt('Change User Account Name:', userProfile.name);
                  if (val) { userProfile.name = val; }
                }}
                className={`flex items-center gap-3 p-2.5 rounded-lg text-left transition-all text-xs font-semibold cursor-pointer ${
                  activeSidebarTab === 'settings' ? 'bg-primary-blue/10 text-primary-blue' : 'text-text-secondary hover:bg-surface-container'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Wishlist Preview Panel */}
          <div className="bg-surface-soft p-5 rounded-2xl border border-border-light shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display text-[10px] font-bold text-text-muted uppercase tracking-widest">
                Wishlist Preview
              </h4>
            </div>

            <div className="space-y-4">
              {WISHLIST_BOOKS.map((wish, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="w-10 h-14 rounded overflow-hidden shrink-0 border border-border-light shadow-sm relative">
                    <div className="book-spine-overlay"></div>
                    <img 
                      src={wish.image} 
                      alt={wish.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-text-primary truncate">{wish.title}</p>
                    <p className="text-[10px] text-text-muted truncate mt-0.5">{wish.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Columns: Main Dashboard Content */}
        <div className="lg:col-span-3 space-y-8">
          
          {/* Yearly Reading Goal Tracker Widget */}
          <section className="bg-surface-soft p-6 md:p-8 rounded-2xl border border-border-light shadow-sm flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="space-y-2 flex-1 text-center md:text-left">
              <span className="font-mono text-[10px] text-primary-blue uppercase tracking-widest font-bold block">
                ANNUAL CHALLENGE
              </span>
              <h3 className="font-display text-xl font-bold text-text-primary">
                Yearly Reading Goal
              </h3>
              
              {!isEditingGoal ? (
                <p className="text-xs text-text-secondary">
                  Target: <span className="font-bold text-text-primary">{yearlyGoal} books</span>. You have completed <span className="font-bold text-primary-blue">{userProfile.booksRead} books</span> this year!
                  <button 
                    onClick={() => { setIsEditingGoal(true); setGoalInput(String(yearlyGoal)); }} 
                    className="ml-2 text-primary-blue hover:underline font-bold text-[10px] uppercase cursor-pointer"
                  >
                    Edit
                  </button>
                </p>
              ) : (
                <form onSubmit={handleUpdateGoalSubmit} className="flex items-center justify-center md:justify-start gap-2 pt-1">
                  <input 
                    type="number"
                    value={goalInput}
                    onChange={(e) => setGoalInput(e.target.value)}
                    className="w-20 bg-surface-card border border-border-light px-2.5 py-1.5 rounded-lg text-xs font-bold text-text-primary outline-none"
                    min="1"
                    required
                    autoFocus
                  />
                  <button type="submit" className="bg-primary-blue text-white px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase cursor-pointer">
                    Save
                  </button>
                  <button type="button" onClick={() => setIsEditingGoal(false)} className="text-text-muted text-[10px] font-bold uppercase ml-1 cursor-pointer">
                    Cancel
                  </button>
                </form>
              )}
            </div>

            <div className="w-full md:w-64 space-y-2 shrink-0">
              <div className="flex justify-between items-center text-xs font-semibold text-text-secondary">
                <span>Progress</span>
                <span className="font-mono font-bold text-primary-blue">{goalPercentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-surface-container rounded-full overflow-hidden border border-border-light shadow-inner">
                <div 
                  className="h-full bg-success-green rounded-full transition-all duration-1000" 
                  style={{ width: `${goalPercentage}%` }}
                ></div>
              </div>
              <p className="text-[10px] text-text-muted text-right italic leading-relaxed">
                {yearlyGoal - userProfile.booksRead > 0 
                  ? `${yearlyGoal - userProfile.booksRead} more books to reach your target!` 
                  : "Goal achieved! Excellent reading discipline."}
              </p>
            </div>
          </section>

          {/* Continue Reading Section matching exact mockup aspect */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-text-primary tracking-tight">
                Continue Reading
              </h3>
              
              <div className="flex gap-1.5">
                <button 
                  onClick={() => alert("Slide left is simulated.")}
                  className="w-7 h-7 rounded-full border border-border-light flex items-center justify-center hover:bg-surface-soft text-text-secondary transition-colors cursor-pointer"
                  title="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => alert("Slide right is simulated.")}
                  className="w-7 h-7 rounded-full border border-border-light flex items-center justify-center hover:bg-surface-soft text-text-secondary transition-colors cursor-pointer"
                  title="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Slider cards wrapper */}
            <div className="flex flex-col sm:flex-row gap-6">
              {CONTINUE_READING_ITEMS.map((item) => (
                <div 
                  key={item.id}
                  className="flex-1 bg-surface-soft rounded-2xl border border-border-light overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300"
                >
                  {/* Aspect height overlay */}
                  <div className="h-40 relative overflow-hidden bg-surface-container">
                    <div className="book-spine-overlay"></div>
                    <div className="book-edge-overlay"></div>
                    <img 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      src={item.image} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER_IMAGE;
                      }}
                    />
                    
                    {/* Shadow visual layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                      <span className="px-2 py-0.5 bg-primary-blue text-white text-[9px] font-bold rounded uppercase tracking-wider">
                        {item.chapter}
                      </span>
                      <span className="text-[10px] font-sans font-medium text-white/90">
                        {item.progress}% Complete
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col justify-between">
                    <div>
                      <h4 className="font-display text-sm font-bold text-text-primary leading-tight mb-0.5 truncate">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-text-secondary truncate">
                        {item.author}
                      </p>
                      
                      {/* Line progress bar */}
                      <div className="mt-4 w-full h-1 bg-surface-container rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary-blue rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <button 
                      onClick={() => onOpenReader(item.title)}
                      className="mt-4 w-full py-2.5 bg-primary-blue hover:bg-primary-blue-container text-white rounded-xl font-display text-[11px] font-bold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
                    >
                      {item.btnLabel}
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </section>

          {/* Achievements Grid Section */}
          <section className="space-y-4">
            <h3 className="font-display text-lg font-bold text-text-primary tracking-tight">
              Earned Badges & Achievements
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PREMIUM_ACHIEVEMENTS.map((ach) => (
                <div 
                  key={ach.id}
                  className={`p-5 rounded-2xl border flex gap-4 items-center transition-all ${
                    ach.unlocked 
                      ? 'bg-surface-soft border-border-light shadow-sm'
                      : 'bg-surface-soft/40 border-border-light/40 opacity-50'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border ${
                    ach.unlocked
                      ? 'bg-primary-blue/10 border-primary-blue/20 text-primary-blue shadow-inner'
                      : 'bg-surface-container border-border-light text-text-muted'
                  }`}>
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-display text-xs font-bold text-text-primary">
                      {ach.title}
                    </h4>
                    <p className="font-sans text-[10px] text-text-secondary leading-relaxed mt-0.5">
                      {ach.desc}
                    </p>
                    {ach.unlocked && (
                      <span className="inline-flex items-center gap-0.5 text-success-green text-[9px] font-bold font-mono mt-1 uppercase">
                        <Check className="w-3 h-3" /> Unlocked
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Orders Section */}
          <section className="space-y-4">
            <h3 className="font-display text-lg font-bold text-text-primary tracking-tight">
              Recent Orders
            </h3>

            <div className="bg-surface-soft rounded-2xl border border-border-light overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  
                  <thead>
                    <tr className="bg-surface-container-low border-b border-border-light text-text-secondary">
                      <th className="p-4 font-display text-[9px] font-bold uppercase tracking-wider">Item</th>
                      <th className="p-4 font-display text-[9px] font-bold uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="p-4 font-display text-[9px] font-bold uppercase tracking-wider hidden sm:table-cell text-center">Status</th>
                      <th className="p-4 font-display text-[9px] font-bold uppercase tracking-wider text-right">Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allOrdersList.slice(0, showAllOrders ? undefined : 2).map((ord, idx) => (
                      <tr 
                        key={idx}
                        className="border-b border-border-light/45 hover:bg-surface-container/30 transition-colors text-text-primary"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-12 rounded bg-surface-container overflow-hidden border border-border-light shrink-0 shadow-sm relative">
                              <div className="book-spine-overlay"></div>
                              <img 
                                src={ord.bookImage} 
                                alt={ord.bookTitle} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                                onError={(e) => {
                                  e.currentTarget.src = PLACEHOLDER_IMAGE;
                                }}
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-display text-xs font-bold truncate max-w-[150px] sm:max-w-[200px]">
                                {ord.bookTitle}
                              </p>
                              <p className="text-[10px] text-text-muted truncate mt-0.5">
                                {ord.bookType}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 font-sans text-xs text-text-secondary hidden md:table-cell font-medium">
                          {ord.date}
                        </td>

                        <td className="p-4 hidden sm:table-cell text-center">
                          <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${
                            ord.status === 'Delivered'
                              ? 'bg-success-green/10 text-success-green border border-success-green/20'
                              : 'bg-primary-blue/10 text-primary-blue border border-primary-blue/20 animate-pulse'
                          }`}>
                            {ord.status}
                          </span>
                        </td>

                        <td className="p-4 font-display text-xs font-bold text-right text-primary-blue">
                          ₹{ord.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* View Transaction History Toggle */}
              <div className="p-4 text-center border-t border-border-light/40 bg-surface-container-low/20">
                <button 
                  onClick={() => setShowAllOrders(!showAllOrders)}
                  className="font-display text-xs font-bold text-primary-blue hover:underline tracking-wide cursor-pointer"
                >
                  {showAllOrders ? 'Collapse Transaction History' : 'View All Transaction History'}
                </button>
              </div>

            </div>
          </section>

          {/* Mobile Quick Links layout (Hidden on desktop) */}
          <section className="lg:hidden grid grid-cols-2 gap-4">
            <button 
              onClick={() => alert("Simulating downloads directory. All premium PDF packages are fully fetched!")}
              className="bg-surface-soft p-4 rounded-xl border border-border-light flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-all text-text-secondary cursor-pointer"
            >
              <Download className="w-5 h-5 text-primary-blue" />
              <span className="font-display text-[10px] font-bold uppercase tracking-wider">Downloads</span>
            </button>
            
            <button 
              onClick={() => alert("Settings overlay is enabled. Profile variables can be updated.")}
              className="bg-surface-soft p-4 rounded-xl border border-border-light flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-all text-text-secondary cursor-pointer"
            >
              <Settings className="w-5 h-5 text-primary-blue" />
              <span className="font-display text-[10px] font-bold uppercase tracking-wider">Settings</span>
            </button>
          </section>

        </div>

      </div>
    </div>
  );
}
