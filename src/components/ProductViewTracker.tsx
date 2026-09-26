'use client';

import { useEffect } from 'react';
import { trackViewItem, trackViewItemList } from '@/lib/gtm';
import { GTMItem } from '@/types/gtm';

export function ProductViewTracker({ item }: { item: GTMItem }) {
  useEffect(() => {
    trackViewItem(item);
  }, [item]);

  return null;
}

export function ProductListViewTracker({ items }: { items: GTMItem[] }) {
  useEffect(() => {
    trackViewItemList(items, 'all_products');
  }, [items]);

  return null;
}