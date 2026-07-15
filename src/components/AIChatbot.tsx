import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Sparkles, Send, X, Bot, User, ArrowRight } from 'lucide-react';
import { Book } from '../types';
import { BOOKS } from '../data';

interface AIChatbotProps {
  onAddToCart: (book: Book) => void;
  onNavigate: (tab: 'home' | 'browse' | 'cart' | 'profile') => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedBook?: Book;
}

export default function AIChatbot({ onAddToCart, onNavigate }: AIChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am BookVerse AI, your personal reading assistant. Ask me to recommend design or tech books, summarize any of our editions, or create a personalized reading list for you!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    const prompt = input.toLowerCase().trim();
    setInput('');
    setIsTyping(true);

    // Simulate AI response logic matching book keywords
    setTimeout(() => {
      let aiText = "I'm analyzing our catalog. Could you specify if you are looking for tech, business, minimalist architecture, or fiction? I'd love to curate the perfect match for you.";
      let recommended: Book | undefined = undefined;

      if (prompt.includes('tech') || prompt.includes('digital') || prompt.includes('soul') || prompt.includes('code')) {
        const soulBook = BOOKS.find(b => b.id === 'b2'); // The Digital Soul
        aiText = "Based on your interest in digital culture, technology, and coding philosophy, I highly recommend 'The Digital Soul'. It discusses the intersection of machine code, human consciousness, and digital ethics.";
        recommended = soulBook;
      } else if (prompt.includes('minimal') || prompt.includes('space') || prompt.includes('architecture') || prompt.includes('design')) {
        const spaceBook = BOOKS.find(b => b.id === 'b1'); // Modernism & Space
        aiText = "For design philosophy and structural spatial theory, I recommend Elena Sato's 'Modernism & Space'. It's a masterclass in modern minimalist spatial aesthetics and layouts.";
        recommended = spaceBook;
      } else if (prompt.includes('business') || prompt.includes('marketing') || prompt.includes('growth')) {
        const productBook = BOOKS.find(b => b.id === 'b6'); // Product Led Growth
        aiText = "If you want to understand modern business economics and how to build scalable tech startups, 'Product Led Growth' by Wesley Zhao is a must-read benchmark.";
        recommended = productBook;
      } else if (prompt.includes('summarize') || prompt.includes('summary')) {
        if (prompt.includes('space') || prompt.includes('modernism')) {
          aiText = "Summary of 'Modernism & Space': The book explores how space is organized in the modern era, focusing on minimalism, clean structural forms, and the transition of the web browser to our modern visual gallery.";
        } else if (prompt.includes('soul') || prompt.includes('digital')) {
          aiText = "Summary of 'The Digital Soul': A philosophical text examining the role of human consciousness in the age of generative models, clean API architectures, and the moral boundaries of artificial reasoning.";
        } else {
          aiText = "Which book would you like me to summarize? Just ask: 'Summarize Modernism & Space' or 'Summarize The Digital Soul'.";
        }
      } else if (prompt.includes('reading list') || prompt.includes('list') || prompt.includes('curation')) {
        aiText = "Here is a curated 3-step reading list for a startup founder:\n1. 'Product Led Growth' (Wesley Zhao) - Business Strategy\n2. 'The Digital Soul' (Marcus Vance) - Tech & Ethics\n3. 'Modernism & Space' (Elena Sato) - Aesthetic Philosophy";
      }

      setMessages(prev => [...prev, {
        id: String(Date.now() + 1),
        sender: 'ai',
        text: aiText,
        recommendedBook: recommended
      }]);
      setIsTyping(false);
    }, 900);
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  return (
    <>
      {/* Floating AI Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-primary-blue to-accent-pink text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl active:scale-90 transition-all z-40 animate-badge-bump group cursor-pointer border border-white/20"
        title="Ask BookVerse AI"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Sparkles className="w-6 h-6 animate-pulse" />}
      </button>

      {/* Glassmorphic AI Chatbox Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-border-light bg-surface-card/90 backdrop-blur-md z-40 flex flex-col animate-page-in">
          
          {/* Header banner */}
          <div className="p-4 bg-gradient-to-r from-primary-blue/10 to-accent-pink/10 border-b border-border-light/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-blue to-accent-pink flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display text-sm font-bold text-text-primary tracking-tight">BookVerse Copilot</h4>
                <span className="text-[9px] font-mono text-success-green flex items-center gap-1 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-success-green animate-ping"></span>
                  Active recommendation model
                </span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Log area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
              >
                <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white ${
                  msg.sender === 'user' ? 'bg-primary-blue' : 'bg-surface-container text-primary-blue'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className="space-y-3">
                  <div className={`p-3 rounded-2xl text-xs font-sans leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary-blue text-white rounded-tr-none' 
                      : 'bg-surface-soft border border-border-light text-text-primary rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>

                  {/* Recommendation Card injection */}
                  {msg.recommendedBook && (
                    <div className="p-3 bg-surface-card border border-border-light rounded-xl flex gap-3 shadow-md animate-fade-in items-center">
                      <img 
                        src={msg.recommendedBook.image} 
                        alt={msg.recommendedBook.title} 
                        className="w-10 h-14 object-cover rounded shadow-sm shrink-0 border border-border-light/45"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="font-display text-[10px] font-bold text-text-primary truncate">{msg.recommendedBook.title}</h5>
                        <p className="font-sans text-[9px] text-text-muted truncate mb-2">{msg.recommendedBook.author}</p>
                        
                        <div className="flex gap-2">
                          <button
                            onClick={() => onAddToCart(msg.recommendedBook!)}
                            className="px-2.5 py-1 bg-primary-blue hover:bg-primary-blue-container text-white text-[9px] font-display font-bold uppercase rounded cursor-pointer transition-all active:scale-95"
                          >
                            Add to Bag
                          </button>
                          <button
                            onClick={() => {
                              onNavigate('browse');
                              setIsOpen(false);
                            }}
                            className="text-[9px] font-display font-semibold text-text-muted hover:underline cursor-pointer flex items-center gap-0.5"
                          >
                            View details
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 max-w-[80%] items-center animate-pulse">
                <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center text-primary-blue">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-surface-soft border border-border-light p-3 rounded-2xl rounded-tl-none text-xs text-text-muted flex gap-1 items-center">
                  <span>AI is curating</span>
                  <span className="w-1 h-1 rounded-full bg-text-muted animate-bounce"></span>
                  <span className="w-1 h-1 rounded-full bg-text-muted animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 rounded-full bg-text-muted animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions panels */}
          {messages.length === 1 && (
            <div className="px-4 pb-2 pt-2 border-t border-border-light/30 flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSuggestionClick("Summarize Modernism & Space")}
                className="px-2.5 py-1.5 bg-surface-soft hover:bg-surface-container border border-border-light/60 text-text-secondary text-[10px] rounded-lg transition-colors cursor-pointer text-left"
              >
                📖 Summarize 'Modernism & Space'
              </button>
              <button
                onClick={() => handleSuggestionClick("Recommend a design book")}
                className="px-2.5 py-1.5 bg-surface-soft hover:bg-surface-container border border-border-light/60 text-text-secondary text-[10px] rounded-lg transition-colors cursor-pointer text-left"
              >
                ✨ Recommend a design book
              </button>
              <button
                onClick={() => handleSuggestionClick("Founder reading list")}
                className="px-2.5 py-1.5 bg-surface-soft hover:bg-surface-container border border-border-light/60 text-text-secondary text-[10px] rounded-lg transition-colors cursor-pointer text-left"
              >
                💼 Founder reading list
              </button>
            </div>
          )}

          {/* Prompt Entry Box form */}
          <form 
            onSubmit={handleSendMessage}
            className="p-4 border-t border-border-light/60 bg-surface-card flex gap-2"
          >
            <input
              type="text"
              placeholder="Ask Copilot for books, lists, summaries..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-surface-soft border border-border-light rounded-xl outline-none focus:ring-2 focus:ring-primary-blue/15 focus:border-primary-blue font-sans text-xs text-text-primary placeholder:text-text-muted"
            />
            <button
              type="submit"
              className="w-10 h-10 bg-primary-blue hover:bg-primary-blue-container text-white rounded-xl flex items-center justify-center active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
