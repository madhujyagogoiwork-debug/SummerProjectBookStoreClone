import React, { useState } from 'react';
import { Award, ShieldCheck, Download, Settings, History, Gift, ChevronLeft, ChevronRight, Check, X, FileText, ExternalLink } from 'lucide-react';
import { UserProfile, Order } from '../types';
import { USER_PROFILE, RECENT_ORDERS, CONTINUE_READING_ITEMS, WISHLIST_BOOKS } from '../data';

interface ProfileScreenProps {
  userProfile: UserProfile;
  orders: Order[];
  onOpenReader: (bookTitle: string) => void;
}

export default function ProfileScreen({ userProfile, orders, onOpenReader }: ProfileScreenProps) {
  const [activeSidebarTab, setActiveSidebarTab] = useState<'activity' | 'downloads' | 'settings'>('activity');
  const [showAllOrders, setShowAllOrders] = useState(false);

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

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 md:px-12 py-6 animate-fade-in">
      
      {/* Profile Header Bento structure */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Julian Thorne User Badge Card */}
        <div className="md:col-span-2 bg-surface-card p-6 md:p-8 rounded-2xl border border-border-light flex flex-col md:flex-row gap-6 items-center md:items-start shadow-sm">
          
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-md border-2 border-primary-blue/10 shrink-0">
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

          <div className="text-center md:text-left flex-1 space-y-4">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-text-primary tracking-tight">
                {userProfile.name}
              </h2>
              <p className="font-sans text-xs text-text-secondary font-medium">
                {userProfile.role}
              </p>
            </div>

            {/* Read Count and reward stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <div className="bg-surface-container-low px-5 py-2.5 rounded-xl border border-surface-container-high text-center md:text-left shadow-sm min-w-[110px]">
                <p className="font-display text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  Books Read
                </p>
                <p className="font-display text-2xl font-extrabold text-primary-blue mt-0.5">
                  {userProfile.booksRead}
                </p>
              </div>
              
              <div className="bg-surface-container-low px-5 py-2.5 rounded-xl border border-surface-container-high text-center md:text-left shadow-sm min-w-[110px]">
                <p className="font-display text-[10px] font-bold text-text-muted uppercase tracking-wider">
                  Reward Points
                </p>
                <p className="font-display text-2xl font-extrabold text-primary-blue mt-0.5">
                  {userProfile.rewardPoints.toLocaleString()}
                </p>
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
              TIER STATUS
            </p>
            <h3 className="font-display text-2xl font-extrabold tracking-tight">
              {userProfile.tierStatus}
            </h3>
            <p className="font-sans text-xs text-white/85 mt-2 leading-relaxed">
              You are {userProfile.pointsToNextTier} points away from {userProfile.nextTier} status. Keep reading to unlock exclusive archive access.
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
            
            <div className="flex justify-between items-center text-[10px] font-medium text-white/70 mt-2">
              <span>75% complete</span>
              <span className="uppercase tracking-wider font-bold">Gold Status</span>
            </div>
          </div>

        </div>

      </section>

      {/* Main Content Area: Sidebar on desktop, Grid on right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar controls (Hidden on mobile, layout bento on desktop) */}
        <aside className="hidden lg:flex flex-col gap-6">
          
          {/* Quick Access Menu */}
          <div className="bg-surface-card p-5 rounded-2xl border border-border-light shadow-sm">
            <h4 className="font-display text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">
              Quick Access
            </h4>
            
            <div className="flex flex-col gap-1.5">
              <button 
                onClick={() => {
                  setActiveSidebarTab('activity');
                  alert('Recent Activity log is active.');
                }}
                className={`flex items-center gap-3 p-2.5 rounded-lg text-left transition-all text-xs font-semibold ${
                  activeSidebarTab === 'activity' ? 'bg-primary-blue/5 text-primary-blue' : 'text-text-secondary hover:bg-surface-container-low'
                }`}
              >
                <History className="w-4 h-4 shrink-0" />
                <span>Recent Activity</span>
              </button>

              <button 
                onClick={() => {
                  setActiveSidebarTab('downloads');
                  alert("Opening downloads archive directory. You've unlocked 4 luxury e-book PDFs.");
                }}
                className={`flex items-center gap-3 p-2.5 rounded-lg text-left transition-all text-xs font-semibold ${
                  activeSidebarTab === 'downloads' ? 'bg-primary-blue/5 text-primary-blue' : 'text-text-secondary hover:bg-surface-container-low'
                }`}
              >
                <Download className="w-4 h-4 shrink-0" />
                <span>Downloads</span>
              </button>

              <button 
                onClick={() => {
                  setActiveSidebarTab('settings');
                  const val = prompt('Change Julian Thorne Name:', userProfile.name);
                  if (val) { userProfile.name = val; }
                }}
                className={`flex items-center gap-3 p-2.5 rounded-lg text-left transition-all text-xs font-semibold ${
                  activeSidebarTab === 'settings' ? 'bg-primary-blue/5 text-primary-blue' : 'text-text-secondary hover:bg-surface-container-low'
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
                Wishlist
              </h4>
              <span className="text-primary-blue text-[10px] font-bold tracking-wider hover:underline cursor-pointer">
                VIEW ALL
              </span>
            </div>

            <div className="space-y-4">
              {WISHLIST_BOOKS.map((wish, index) => (
                <div key={index} className="flex gap-3 items-center">
                  <div className="w-10 h-14 rounded bg-surface-container overflow-hidden shrink-0 border border-border-light/35 shadow-sm">
                    <img 
                      src={wish.image} 
                      alt={wish.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
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
          
          {/* Continue Reading Section matching exact mockup aspect */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-text-primary tracking-tight">
                Continue Reading
              </h3>
              
              <div className="flex gap-1.5">
                <button 
                  onClick={() => alert("Slide left is simulated.")}
                  className="w-7 h-7 rounded-full border border-border-light flex items-center justify-center hover:bg-surface-container-low text-text-secondary transition-colors"
                  title="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => alert("Slide right is simulated.")}
                  className="w-7 h-7 rounded-full border border-border-light flex items-center justify-center hover:bg-surface-container-low text-text-secondary transition-colors"
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
                  className="flex-1 bg-surface-card rounded-xl border border-border-light overflow-hidden shadow-sm group hover:shadow-md transition-all duration-300"
                >
                  {/* Aspect height overlay */}
                  <div className="h-44 relative overflow-hidden bg-surface-container">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={item.image} 
                      alt={item.title} 
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Shadow visual layer */}
                    <div className="absolute inset-0 bg-gradient-to-t from-text-primary/75 to-transparent"></div>
                    
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end text-white">
                      <span className="px-2 py-0.5 bg-primary-blue text-white text-[9px] font-bold rounded uppercase tracking-wider">
                        {item.chapter}
                      </span>
                      <span className="text-[10px] font-sans font-medium text-white/90">
                        {item.progress}% Complete
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
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

                    <button 
                      onClick={() => onOpenReader(item.title)}
                      className="mt-4 w-full py-2 bg-primary-blue hover:bg-primary-blue-container text-white rounded-lg font-display text-[11px] font-semibold transition-all active:scale-98"
                    >
                      {item.btnLabel}
                    </button>
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

            <div className="bg-surface-card rounded-2xl border border-border-light overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  
                  <thead>
                    <tr className="bg-surface-container-low border-b border-border-light text-text-secondary">
                      <th className="p-4 font-display text-[10px] font-bold uppercase tracking-wider">Item</th>
                      <th className="p-4 font-display text-[10px] font-bold uppercase tracking-wider hidden md:table-cell">Date</th>
                      <th className="p-4 font-display text-[10px] font-bold uppercase tracking-wider hidden sm:table-cell text-center">Status</th>
                      <th className="p-4 font-display text-[10px] font-bold uppercase tracking-wider text-right">Price</th>
                    </tr>
                  </thead>

                  <tbody>
                    {allOrdersList.slice(0, showAllOrders ? undefined : 2).map((ord, idx) => (
                      <tr 
                        key={idx}
                        className="border-b border-border-light/45 hover:bg-surface-soft transition-colors text-text-primary"
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-12 rounded bg-surface-container overflow-hidden border border-border-light/20 shrink-0 shadow-sm">
                              <img 
                                src={ord.bookImage} 
                                alt={ord.bookTitle} 
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-display text-xs font-bold truncate max-w-[150px] sm:max-w-[200px]">
                                {ord.bookTitle}
                              </p>
                              <p className="text-[10px] text-text-muted truncate">
                                {ord.bookType}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="p-4 font-sans text-xs text-text-secondary hidden md:table-cell">
                          {ord.date}
                        </td>

                        <td className="p-4 hidden sm:table-cell text-center">
                          <span className={`px-2.5 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider ${
                            ord.status === 'Delivered'
                              ? 'bg-success-green/10 text-success-green'
                              : 'bg-primary-blue/10 text-primary-blue'
                          }`}>
                            {ord.status}
                          </span>
                        </td>

                        <td className="p-4 font-display text-xs font-bold text-right">
                          ${ord.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* View Transaction History Toggle */}
              <div className="p-4 text-center border-t border-border-light/40">
                <button 
                  onClick={() => setShowAllOrders(!showAllOrders)}
                  className="font-display text-xs font-bold text-primary-blue hover:underline tracking-wide"
                >
                  {showAllOrders ? 'Collapse Transaction History' : 'View All Transaction History'}
                </button>
              </div>

            </div>
          </section>

          {/* Mobile Quick Links layout (Hidden on desktop, Bento layout helper for mobile viewport) */}
          <section className="lg:hidden grid grid-cols-2 gap-4">
            <button 
              onClick={() => alert("Simulating downloads repository trigger. All 4 premium PDF collections downloaded successfully!")}
              className="bg-surface-card p-4 rounded-xl border border-border-light flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-all text-text-secondary"
            >
              <Download className="w-5 h-5 text-primary-blue" />
              <span className="font-display text-[11px] font-bold">Downloads</span>
            </button>
            
            <button 
              onClick={() => alert("Simulation setup menu is ready. You can modify preferences in the user account panel.")}
              className="bg-surface-card p-4 rounded-xl border border-border-light flex flex-col items-center justify-center gap-2 shadow-sm active:scale-95 transition-all text-text-secondary"
            >
              <Settings className="w-5 h-5 text-primary-blue" />
              <span className="font-display text-[11px] font-bold">Settings</span>
            </button>
          </section>

        </div>

      </div>
    </div>
  );
}
