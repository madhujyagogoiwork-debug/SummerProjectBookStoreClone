import React, { useState } from 'react';
import { BarChart3, TrendingUp, Package, Users, PlusCircle, AlertCircle, Trash2, ShieldCheck, DollarSign } from 'lucide-react';
import { Book, BookType } from '../types';
import { BOOKS } from '../data';

interface AdminDashboardProps {
  onAddNewBook: (book: Book) => void;
  onDeleteBook: (bookId: string) => void;
}

export default function AdminDashboard({ onAddNewBook, onDeleteBook }: AdminDashboardProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState<'Fiction' | 'Tech' | 'Business' | 'Study Notes' | 'Courses'>('Fiction');
  const [type, setType] = useState<BookType>('physical');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const [activeBooks, setActiveBooks] = useState<Book[]>(BOOKS);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author || !price) return;

    const newBook: Book = {
      id: `b${activeBooks.length + 10}`,
      title,
      author,
      price: parseFloat(price) || 29.99,
      category,
      type,
      description: description || "No custom description provided. Premium bookstore release.",
      image: image || "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop",
      meta: "Special Collector Edition",
      isNew: true
    };

    onAddNewBook(newBook);
    setActiveBooks(prev => [newBook, ...prev]);
    
    // Reset Form
    setTitle('');
    setAuthor('');
    setPrice('');
    setDescription('');
    setImage('');
    setShowAddForm(false);
  };

  const handleDelete = (id: string) => {
    onDeleteBook(id);
    setActiveBooks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 md:px-12 py-6 animate-page-in">
      
      {/* Page Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-text-primary">
            Admin Management Console
          </h2>
          <p className="font-sans text-xs text-text-muted mt-1">
            Track business metrics, monitor book inventories, and configure bookstore items.
          </p>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary-blue hover:bg-primary-blue-container text-white font-display text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          Add Catalog Item
        </button>
      </div>

      {/* Bento Grid Metrics Panels */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-surface-soft border border-border-light p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-blue/10 text-primary-blue rounded-xl flex items-center justify-center shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] text-text-muted uppercase tracking-wider">Gross Revenues</span>
            <span className="text-xl font-display font-bold text-text-primary">₹2,84,650.00</span>
          </div>
        </div>

        <div className="bg-surface-soft border border-border-light p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-xl flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] text-text-muted uppercase tracking-wider">Subscribers</span>
            <span className="text-xl font-display font-bold text-text-primary">4,819 Active</span>
          </div>
        </div>

        <div className="bg-surface-soft border border-border-light p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-success-green/10 text-success-green rounded-xl flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] text-text-muted uppercase tracking-wider">Catalog Items</span>
            <span className="text-xl font-display font-bold text-text-primary">{activeBooks.length} Editions</span>
          </div>
        </div>

        <div className="bg-surface-soft border border-border-light p-6 rounded-2xl shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-blue-container/10 text-primary-blue-container rounded-xl flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="block text-[10px] text-text-muted uppercase tracking-wider">Acquisition Rate</span>
            <span className="text-xl font-display font-bold text-text-primary">+12.4% MoM</span>
          </div>
        </div>

      </section>

      {/* Add New Book Modal Form overlay */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div className="bg-surface-card border border-border-light rounded-2xl max-w-lg w-full p-8 shadow-2xl relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute right-4 top-4 text-text-muted hover:text-text-primary p-1.5 hover:bg-surface-soft rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display text-xl font-bold text-text-primary mb-6">
              Create New Bookstore Catalog Item
            </h3>

            <form onSubmit={handleAddSubmit} className="space-y-4 font-sans text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-text-secondary">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Modernist Paradigms"
                    className="w-full p-2.5 bg-surface-soft border border-border-light rounded-xl outline-none focus:ring-2 focus:ring-primary-blue/15"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-text-secondary">Author</label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Elena Sato"
                    className="w-full p-2.5 bg-surface-soft border border-border-light rounded-xl outline-none focus:ring-2 focus:ring-primary-blue/15"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-text-secondary">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 450"
                    className="w-full p-2.5 bg-surface-soft border border-border-light rounded-xl outline-none focus:ring-2 focus:ring-primary-blue/15"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-text-secondary">Category</label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full p-2.5 bg-surface-soft border border-border-light rounded-xl outline-none focus:ring-2 focus:ring-primary-blue/15"
                  >
                    <option value="Fiction">Fiction</option>
                    <option value="Tech">Tech</option>
                    <option value="Business">Business</option>
                    <option value="Study Notes">Study Notes</option>
                    <option value="Courses">Courses</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-text-secondary">Format Type</label>
                  <select
                    value={type}
                    onChange={(e: any) => setType(e.target.value)}
                    className="w-full p-2.5 bg-surface-soft border border-border-light rounded-xl outline-none focus:ring-2 focus:ring-primary-blue/15"
                  >
                    <option value="physical">Hardcover</option>
                    <option value="ebook">E-Book</option>
                    <option value="audiobook">Audiobook</option>
                    <option value="notes">Study Notes</option>
                    <option value="course">Video Course</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] uppercase tracking-wider text-text-secondary">Cover Image URL</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="e.g. https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-surface-soft border border-border-light rounded-xl outline-none focus:ring-2 focus:ring-primary-blue/15"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[10px] uppercase tracking-wider text-text-secondary">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detailed summaries, chapter highlights, publisher details..."
                  rows={3}
                  className="w-full p-2.5 bg-surface-soft border border-border-light rounded-xl outline-none focus:ring-2 focus:ring-primary-blue/15 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-primary-blue hover:bg-primary-blue-container text-white py-3 rounded-xl font-display text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg active:scale-95 transition-all mt-4 cursor-pointer"
              >
                Create Item & Sync
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Stock Inventory Table */}
      <section className="bg-surface-soft border border-border-light rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border-light bg-surface-container-low/20">
          <h3 className="font-display text-sm font-bold text-text-primary">
            Storefront Catalog Inventory ({activeBooks.length} items)
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-border-light/60 bg-surface-soft/45 font-display text-[10px] uppercase tracking-wider text-text-muted">
                <th className="p-4">Book Title / Author</th>
                <th className="p-4">Category</th>
                <th className="p-4">Format</th>
                <th className="p-4 text-right">Price</th>
                <th className="p-4 text-center">Stock</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeBooks.map((book) => (
                <tr 
                  key={book.id}
                  className="border-b border-border-light/45 hover:bg-surface-container/30 transition-colors text-text-primary text-xs font-sans"
                >
                  <td className="p-4 flex items-center gap-3">
                    <img 
                      src={book.image} 
                      alt={book.title} 
                      className="w-8 h-11 object-cover rounded shadow-sm border border-border-light"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <span className="font-display font-bold block truncate max-w-[200px]">{book.title}</span>
                      <span className="text-[10px] text-text-muted block">{book.author}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-text-secondary">
                    {book.category}
                  </td>
                  <td className="p-4 text-text-muted capitalize">
                    {book.type}
                  </td>
                  <td className="p-4 font-bold text-right text-primary-blue">
                    ₹{book.price.toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <span className="px-2 py-0.5 rounded bg-success-green/10 text-success-green text-[9px] font-bold uppercase tracking-wider">
                      In Stock
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleDelete(book.id)}
                      className="p-2 text-text-muted hover:text-error-red hover:bg-error-red/5 rounded-xl transition-all cursor-pointer"
                      title="Delete book"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

// Inline helper X icon for closing
const X = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
