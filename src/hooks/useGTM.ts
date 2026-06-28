// src/hooks/useGTM.ts

'use client';

import { useCallback } from 'react';
import {
  trackViewItem,
  trackViewItemList,
  trackSelectItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackAddShippingInfo,
  trackAddPaymentInfo,
  trackPurchase,
  trackSearch,
} from '@/lib/gtm';
import { GTMItem } from '@/types/gtm';

/**
 * সব GTM ই-কমার্স ইভেন্টের জন্য কাস্টম হুক
 * কম্পোনেন্টে সরাসরি ইমপোর্ট করে ব্যবহার করুন
 */
export const useGTM = () => {
  const fireViewItem = useCallback((item: GTMItem) => {
    trackViewItem(item);
  }, []);

  const fireViewItemList = useCallback((items: GTMItem[], listName: string) => {
    trackViewItemList(items, listName);
  }, []);

  const fireSelectItem = useCallback((item: GTMItem, listName: string) => {
    trackSelectItem(item, listName);
  }, []);

  const fireAddToCart = useCallback((item: GTMItem, quantity: number = 1) => {
    trackAddToCart(item, quantity);
  }, []);

  const fireRemoveFromCart = useCallback((item: GTMItem, quantity: number = 1) => {
    trackRemoveFromCart(item, quantity);
  }, []);

  const fireViewCart = useCallback((items: GTMItem[], totalValue: number) => {
    trackViewCart(items, totalValue);
  }, []);

  const fireBeginCheckout = useCallback((items: GTMItem[], totalValue: number) => {
    trackBeginCheckout(items, totalValue);
  }, []);

  const fireAddShippingInfo = useCallback(
    (items: GTMItem[], shippingTier: string, totalValue: number) => {
      trackAddShippingInfo(items, shippingTier, totalValue);
    },
    []
  );

  const fireAddPaymentInfo = useCallback(
    (items: GTMItem[], paymentType: string, totalValue: number) => {
      trackAddPaymentInfo(items, paymentType, totalValue);
    },
    []
  );

  const firePurchase = useCallback(
    (
      transactionId: string,
      items: GTMItem[],
      total: number,
      tax?: number,
      shipping?: number,
      coupon?: string
    ) => {
      trackPurchase(transactionId, items, total, tax, shipping, coupon);
    },
    []
  );

  const fireSearch = useCallback((searchTerm: string, resultsCount?: number) => {
    trackSearch(searchTerm, resultsCount);
  }, []);

  return {
    fireViewItem,
    fireViewItemList,
    fireSelectItem,
    fireAddToCart,
    fireRemoveFromCart,
    fireViewCart,
    fireBeginCheckout,
    fireAddShippingInfo,
    fireAddPaymentInfo,
    firePurchase,
    fireSearch,
  };
};