// src/lib/gtm.ts

import { sendGTMEvent } from '@next/third-parties/google';
import { GTMEcommerceData, GTMEventType, GTMItem } from '@/types/gtm';

/**
 * সেন্ট্রাল GTM ইভেন্ট ফায়ার ফাংশন
 * সব ই-কমার্স ইভেন্ট এই ফাংশন ব্যবহার করবে
 */
export const fireGTMEvent = (
  eventName: GTMEventType,
  ecommerceData: GTMEcommerceData,
  additionalParams?: Record<string, unknown>
) => {
  // ভ্যালিডেশন: Purchase ইভেন্টে transaction_id আবশ্যক
  if (eventName === 'purchase' && !ecommerceData.transaction_id) {
    console.error('❌ Purchase event requires transaction_id');
    return;
  }

  // Items অ্যারে খালি থাকলে ওয়ার্নিং
  if (!ecommerceData.items || ecommerceData.items.length === 0) {
    console.warn(`⚠️ ${eventName} event fired with empty items array`);
  }

  // GA4 Enhanced Ecommerce স্ট্যান্ডার্ড ফরম্যাট
  const gtmPayload = {
    event: eventName,
    ecommerce: {
      ...ecommerceData,
      // currency ডিফল্ট BDT
      currency: ecommerceData.currency || 'BDT',
    },
    ...additionalParams,
  };

  // sendGTMEvent ব্যবহার করে GTM-এ পাঠানো
  sendGTMEvent(gtmPayload);

  // ডিবাগ লগ (ডেভেলপমেন্টে)
  if (process.env.NODE_ENV === 'development') {
    console.log(`📤 GTM Event: ${eventName}`, gtmPayload);
  }
};

// ============ ইভেন্ট-নির্ভর শর্টকাট ফাংশন ============

export const trackViewItem = (item: GTMItem) => {
  fireGTMEvent('view_item', {
    items: [item],
    value: item.price,
    currency: item.currency || 'BDT',
  });
};

export const trackViewItemList = (items: GTMItem[], listName: string) => {
  fireGTMEvent(
    'view_item_list',
    {
      items,
      currency: items[0]?.currency || 'BDT',
    },
    {
      item_list_name: listName,
      item_list_id: `list_${listName.replace(/\s/g, '_').toLowerCase()}`,
    }
  );
};

export const trackSelectItem = (item: GTMItem, listName: string) => {
  fireGTMEvent(
    'select_item',
    {
      items: [item],
      currency: item.currency || 'BDT',
    },
    {
      item_list_name: listName,
    }
  );
};

export const trackAddToCart = (item: GTMItem, quantity: number = 1) => {
  fireGTMEvent('add_to_cart', {
    items: [{ ...item, quantity }],
    value: item.price * quantity,
    currency: item.currency || 'BDT',
  });
};

export const trackRemoveFromCart = (item: GTMItem, quantity: number = 1) => {
  fireGTMEvent('remove_from_cart', {
    items: [{ ...item, quantity }],
    value: item.price * quantity,
    currency: item.currency || 'BDT',
  });
};

export const trackViewCart = (items: GTMItem[], totalValue: number) => {
  fireGTMEvent('view_cart', {
    items,
    value: totalValue,
    currency: items[0]?.currency || 'BDT',
  });
};

export const trackBeginCheckout = (items: GTMItem[], totalValue: number) => {
  fireGTMEvent('begin_checkout', {
    items,
    value: totalValue,
    currency: items[0]?.currency || 'BDT',
  });
};

export const trackAddShippingInfo = (
  items: GTMItem[],
  shippingTier: string,
  totalValue: number
) => {
  fireGTMEvent('add_shipping_info', {
    items,
    value: totalValue,
    shipping_tier: shippingTier,
    currency: items[0]?.currency || 'BDT',
  });
};

export const trackAddPaymentInfo = (
  items: GTMItem[],
  paymentType: string,
  totalValue: number
) => {
  fireGTMEvent('add_payment_info', {
    items,
    value: totalValue,
    payment_type: paymentType,
    currency: items[0]?.currency || 'BDT',
  });
};

export const trackPurchase = (
  transactionId: string,
  items: GTMItem[],
  total: number,
  tax: number = 0,
  shipping: number = 0,
  coupon?: string
) => {
  fireGTMEvent('purchase', {
    transaction_id: transactionId,
    items,
    value: total,
    tax,
    shipping,
    coupon,
    currency: items[0]?.currency || 'BDT',
  });
};

export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  sendGTMEvent({
    event: 'search',
    search_term: searchTerm,
    ...(resultsCount && { search_results_count: resultsCount }),
  });
};