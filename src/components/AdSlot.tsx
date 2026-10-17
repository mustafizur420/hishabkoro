'use client';

import { useEffect } from 'react';
import { site } from '@/config/site';

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * AdSense বিজ্ঞাপনের জায়গা। NEXT_PUBLIC_ADSENSE_CLIENT না থাকলে কিছুই দেখায় না,
 * তাই অনুমোদনের আগে সাইট পরিষ্কার থাকে। অনুমোদনের পর AdSense থেকে ad unit-এর slot id এনে
 * NEXT_PUBLIC_ADSENSE_SLOT এ বসাও।
 */
export function AdSlot({ slot }: { slot: string }) {
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? '';

  useEffect(() => {
    if (!site.adsenseClient || !adSlot) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // অ্যাড ব্লকার থাকলে চুপচাপ বাদ
    }
  }, [adSlot]);

  if (!site.adsenseClient || !adSlot) return null;
  return (
    <div className="ad-slot" data-placement={slot}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={site.adsenseClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
