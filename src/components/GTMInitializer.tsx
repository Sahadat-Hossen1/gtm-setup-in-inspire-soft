// src/components/GTMInitializer.tsx

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { sendGTMEvent } from '@next/third-parties/google';

/**
 * GTM ইনিশিয়ালাইজার কম্পোনেন্ট
 * - GTM স্ক্রিপ্ট লোড করে
 * - SPA রাউট পরিবর্তন ট্র্যাক করে (পেজভিউ)
 */
export default function GTMInitializer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // পেজভিউ ট্র্যাকিং (SPA নেভিগেশনের জন্য)
  useEffect(() => {
    if (pathname) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
      
      sendGTMEvent({
        event: 'page_view',
        page: {
          url,
          title: document.title,
        },
      });

      // ডিবাগ লগ
      if (process.env.NODE_ENV === 'development') {
        console.log(`📄 Page View: ${url}`);
      }
    }
  }, [pathname, searchParams]);

  return null;
}