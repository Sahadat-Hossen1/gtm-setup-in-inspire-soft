// src/types/gtm.ts

export interface GTMItem {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  item_category?: string;
  item_brand?: string;
  item_variant?: string;
  discount?: number;
  currency?: string;
}

export interface GTMUserData {
  email?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  city?: string;
  postal_code?: string;
  country?: string;
}

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

export interface GTMEcommerceData {
  items: GTMItem[];
  value?: number;
  currency?: string;
  transaction_id?: string; // Purchase ইভেন্টের জন্য
  tax?: number;
  shipping?: number;
  shipping_tier?: string;
  payment_type?: string;
  coupon?: string;
  affiliation?: string;
  user_data?: GTMUserData;
}

export type GTMEventType =
  | 'view_item'
  | 'view_item_list'
  | 'select_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_cart'
  | 'begin_checkout'
  | 'add_shipping_info'
  | 'add_payment_info'
  | 'purchase'
  | 'search'
  | 'generate_lead'
  | 'email_click'
  | 'whatsapp_click';