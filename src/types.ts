export type BookType = 'physical' | 'ebook' | 'audiobook' | 'notes' | 'course';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  meta: string;
  type: BookType;
  category: 'Fiction' | 'Tech' | 'Business' | 'Study Notes' | 'Courses';
  image: string;
  description?: string;
  isNew?: boolean;
  includedInSubscription?: boolean;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface OrderItem {
  book: Book;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: string;
  price: number;
  
  // Simulated visual logging fields
  bookTitle?: string;
  bookType?: string;
  bookImage?: string;

  // Next-Gen DB mapping fields
  items?: OrderItem[];
  subtotal?: number;
  tax?: number;
  total?: number;
  shippingAddress?: string;
  paymentMethod?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  booksRead: number;
  rewardPoints: number;
  tierStatus: string;
  pointsToNextTier: number;
  nextTier: string;
  avatar: string;
}
