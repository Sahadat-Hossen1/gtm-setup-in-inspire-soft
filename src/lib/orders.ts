// src/lib/orders.ts

export interface SavedOrderItem {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  lineTotal: number;
}

export interface SavedOrder {
  orderNumber: string;
  userEmail: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
  };
  deliveryAddress: {
    street: string;
    city: string;
    zipCode: string;
  };
  items: SavedOrderItem[];
  subtotal?: number;
  shipping?: number;
  total: number;
  placedAt: string; // ISO date string
}

const FIFTEEN_DAYS_MS = 15 * 24 * 60 * 60 * 1000;
const ORDERS_STORAGE_KEY = 'inspire_orders';

/**
 * লোকালস্টোরেজ থেকে অর্ডারগুলো রিটার্ন করে এবং ১৫ দিনের পুরনো যেকোনো অর্ডার অটোমেটিক রিমুভ করে
 */
export const getStoredOrders = (): SavedOrder[] => {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];

    const orders: SavedOrder[] = JSON.parse(raw);
    const now = Date.now();

    // ফিল্টার: শুধুমাত্র ১৫ দিনের ভেতরের অর্ডার রাখা হবে
    const validOrders = orders.filter((order) => {
      const placedTimestamp = new Date(order.placedAt).getTime();
      return !isNaN(placedTimestamp) && (now - placedTimestamp) <= FIFTEEN_DAYS_MS;
    });

    // যদি ১৫ দিন পার হওয়া কোনো অর্ডার রিমুভ হয়ে থাকে, লোকালস্টোরেজ আপডেট হবে
    if (validOrders.length !== orders.length) {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(validOrders));
    }

    return validOrders;
  } catch (error) {
    console.error('Failed to parse orders from localStorage', error);
    return [];
  }
};

/**
 * নতুন অর্ডার সেভ করে এবং পূর্বে থাকা ১৫ দিনের চেয়ে পুরনো অর্ডার থাকলে ক্লিন করে
 */
export const saveStoredOrder = (newOrder: SavedOrder): SavedOrder[] => {
  if (typeof window === 'undefined') return [newOrder];

  try {
    const existingValidOrders = getStoredOrders();
    const updatedOrders = [newOrder, ...existingValidOrders];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updatedOrders));
    return updatedOrders;
  } catch (error) {
    console.error('Failed to save order to localStorage', error);
    return [newOrder];
  }
};
