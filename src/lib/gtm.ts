// src/lib/gtm.ts

import { sendGTMEvent } from '@next/third-parties/google';
import { ContactFormData, GTMEcommerceData, GTMEventType, GTMItem, GTMUserData } from '@/types/gtm';

/**
 * ব্রাউজার লোকালস্টোরেজ থেকে লগইন থাকা ইউজারের ডেটা রিড করে GTMUserData ফরম্যাটে তৈরি করে
 */
export const getStoredGTMUserData = (): GTMUserData | undefined => {
  if (typeof window === 'undefined') return undefined;
  try {
    const sessionStr = localStorage.getItem('user_session');
    if (!sessionStr) return undefined;
    const session = JSON.parse(sessionStr);
    if (!session?.email) return undefined;

    const name = (session.name || '').trim();
    const nameParts = name ? name.split(' ') : [];
    const firstName = nameParts[0] || undefined;
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined;

    return {
      email: session.email,
      phone_number: session.phone || undefined,
      first_name: firstName,
      last_name: lastName,
    };
  } catch {
    return undefined;
  }
};

/**
 * সেন্ট্রাল GTM ইভেন্ট ফায়ার ফাংশন
 * সব ই-কমার্স ইভেন্ট এই ফাংশন ব্যবহার করবে
 */
export const fireGTMEvent = (
  eventName: GTMEventType,
  ecommerceData: GTMEcommerceData,
  additionalParams?: Record<string, unknown>,
  userData?: GTMUserData
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

  // ইউজার ডাটা চেক: প্যারামিটার থেকে অথবা লোকালস্টোরেজ সেশন থেকে
  const activeUserData = userData || ecommerceData.user_data || getStoredGTMUserData();

  // GA4 Enhanced Ecommerce স্ট্যান্ডার্ড ফরম্যাট
  const gtmPayload: Record<string, unknown> = {
    event: eventName,
    ecommerce: {
      ...ecommerceData,
      // currency ডিফল্ট BDT
      currency: ecommerceData.currency || 'BDT',
    },
    ...(activeUserData && Object.keys(activeUserData).length > 0 && { user_data: activeUserData }),
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

export const trackViewItem = (item: GTMItem, userData?: GTMUserData) => {
  fireGTMEvent(
    'view_item',
    {
      items: [item],
      value: item.price,
      currency: item.currency || 'BDT',
    },
    undefined,
    userData
  );
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

export const trackAddToCart = (item: GTMItem, quantity: number = 1, userData?: GTMUserData) => {
  fireGTMEvent(
    'add_to_cart',
    {
      items: [{ ...item, quantity }],
      value: item.price * quantity,
      currency: item.currency || 'BDT',
    },
    undefined,
    userData
  );
};

export const trackRemoveFromCart = (item: GTMItem, quantity: number = 1, userData?: GTMUserData) => {
  fireGTMEvent(
    'remove_from_cart',
    {
      items: [{ ...item, quantity }],
      value: item.price * quantity,
      currency: item.currency || 'BDT',
    },
    undefined,
    userData
  );
};

export const trackViewCart = (items: GTMItem[], totalValue: number, userData?: GTMUserData) => {
  fireGTMEvent(
    'view_cart',
    {
      items,
      value: totalValue,
      currency: items[0]?.currency || 'BDT',
    },
    undefined,
    userData
  );
};

export const trackBeginCheckout = (items: GTMItem[], totalValue: number, userData?: GTMUserData) => {
  fireGTMEvent(
    'begin_checkout',
    {
      items,
      value: totalValue,
      currency: items[0]?.currency || 'BDT',
    },
    undefined,
    userData
  );
};

export const trackAddShippingInfo = (
  items: GTMItem[],
  shippingTier: string,
  totalValue: number,
  userData?: GTMUserData
) => {
  fireGTMEvent(
    'add_shipping_info',
    {
      items,
      value: totalValue,
      shipping_tier: shippingTier,
      currency: items[0]?.currency || 'BDT',
    },
    undefined,
    userData
  );
};

export const trackAddPaymentInfo = (
  items: GTMItem[],
  paymentType: string,
  totalValue: number,
  userData?: GTMUserData
) => {
  fireGTMEvent(
    'add_payment_info',
    {
      items,
      value: totalValue,
      payment_type: paymentType,
      currency: items[0]?.currency || 'BDT',
    },
    undefined,
    userData
  );
};

export const trackPurchase = (
  transactionId: string,
  items: GTMItem[],
  total: number,
  tax: number = 0,
  shipping: number = 0,
  coupon?: string,
  userData?: GTMUserData
) => {
  fireGTMEvent(
    'purchase',
    {
      transaction_id: transactionId,
      items,
      value: total,
      tax,
      shipping,
      coupon,
      currency: items[0]?.currency || 'BDT',
    },
    undefined,
    userData
  );
};

export const trackSearch = (searchTerm: string, resultsCount?: number) => {
  sendGTMEvent({
    event: 'search',
    search_term: searchTerm,
    ...(resultsCount && { search_results_count: resultsCount }),
  });
};

export const trackSignUp = (method: string = 'email', userData?: GTMUserData) => {
  const activeUserData = userData || getStoredGTMUserData();
  sendGTMEvent({
    event: 'sign_up',
    method,
    ...(activeUserData && { user_data: activeUserData }),
  });
};

export const trackLogin = (method: string = 'email', userData?: GTMUserData) => {
  const activeUserData = userData || getStoredGTMUserData();
  sendGTMEvent({
    event: 'login',
    method,
    ...(activeUserData && { user_data: activeUserData }),
  });
};

export const trackContactSubmission = (contactData?: ContactFormData) => {
  sendGTMEvent({
    event: 'generate_lead',
    form_name: 'contact_form',
    ...(contactData && {
      contact_data: {
        first_name: contactData.firstName,
        last_name: contactData.lastName,
        email: contactData.email,
        subject: contactData.subject,
        message: contactData.message,
      },
      user_data: {
        email: contactData.email,
        first_name: contactData.firstName,
        last_name: contactData.lastName,
      },
    }),
  });
};

export const trackEmailClick = (email: string = 'hello@inspiresoft.com', source: string = 'contact_page') => {
  sendGTMEvent({
    event: 'email_click',
    contact_channel: 'email',
    target_email: email,
    click_source: source,
  });
};

export const trackWhatsAppClick = (phoneNumber: string = '+15550000000', source: string = 'contact_page') => {
  sendGTMEvent({
    event: 'whatsapp_click',
    contact_channel: 'whatsapp',
    target_phone: phoneNumber,
    click_source: source,
  });
};