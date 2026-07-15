// src/api/routes.ts
// Mock API endpoints and request handlers for BookVerse Backend integration

import { Book, CartItem, Order, UserProfile } from '../types';
import { BOOKS } from '../data';

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
}

/**
 * GET /api/books
 * Fetches all active books in the catalog.
 */
export async function getBooks(category?: string): Promise<APIResponse<Book[]>> {
  try {
    let result = [...BOOKS];
    if (category && category !== 'All') {
      result = result.filter(b => b.category === category);
    }
    return {
      success: true,
      data: result,
      timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to retrieve books.",
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * POST /api/orders
 * Confirms payment and generates an order record.
 */
export async function createOrder(
  userId: string,
  items: CartItem[],
  subtotal: number,
  discount: number,
  tax: number,
  total: number,
  paymentMethod: string
): Promise<APIResponse<Order>> {
  try {
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 90000) + 10000}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      bookTitle: items.length > 1 ? `${items[0].book.title} + ${items.length - 1} more` : items[0].book.title,
      bookImage: items[0].book.image,
      bookType: items.length > 1 ? `${items.length} Curated Items` : items[0].book.meta || 'Collector Edition',
      status: 'Pending',
      price: total
    };

    return {
      success: true,
      data: newOrder,
      timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "Failed to create order.",
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * POST /api/ai/recommend
 * Simulates Gemini AI Studio recommendations model callback.
 */
export async function getAIRecommendations(prompt: string): Promise<APIResponse<{ text: string; recommendedBookId?: string }>> {
  try {
    const q = prompt.toLowerCase();
    let recommendation = {
      text: "I analyzed your request. I recommend exploring design collections like Modernism & Space.",
      recommendedBookId: "b1"
    };

    if (q.includes("tech") || q.includes("code")) {
      recommendation = {
        text: "Based on technology vectors, 'The Digital Soul' is the ideal choice.",
        recommendedBookId: "b2"
      };
    } else if (q.includes("business") || q.includes("strategy")) {
      recommendation = {
        text: "Wesley Zhao's 'Product Led Growth' is highly recommended for tech operations.",
        recommendedBookId: "b6"
      };
    }

    return {
      success: true,
      data: recommendation,
      timestamp: new Date().toISOString()
    };
  } catch (err: any) {
    return {
      success: false,
      error: err.message || "AI inference failed.",
      timestamp: new Date().toISOString()
    };
  }
}
