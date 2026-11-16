import type { ReactNode } from 'react';

/** প্রতিটা টুলের নিজস্ব লাইন-আইকন (24×24, currentColor)। নতুন টুল যোগ করলে এখানে তার href দিয়ে একটা আইকন দাও;
 *  না দিলে tools.ts-এর ছোট লেখাটা (icon) দেখায়। */
const ICONS: Record<string, ReactNode> = {
  // গ্র্যাজুয়েশন ক্যাপ
  '/cgpa/': (
    <>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5z" />
      <path d="M6.5 11v4.2c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3V11" />
      <path d="M21.5 9v5" />
    </>
  ),
  // জন্মদিনের কেক
  '/age-calculator/': (
    <>
      <path d="M4 20.5h16" />
      <path d="M5 20.5v-6.5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v6.5" />
      <path d="M5 15.5c1.2 1 2.3 1 3.5 0s2.3-1 3.5 0 2.3 1 3.5 0 2.3-1 3.5 0" />
      <path d="M12 12V8.5" />
      <path d="M12 4.2c.9 1 1.2 1.8 0 2.8-1.2-1-.9-1.8 0-2.8z" className="ic-flame" />
    </>
  ),
  // ব্যাংক
  '/emi-calculator/': (
    <>
      <path d="M3 9.5 12 4l9 5.5" />
      <path d="M4.5 9.5h15" />
      <path d="M6.5 12v5.5M10.5 12v5.5M13.5 12v5.5M17.5 12v5.5" />
      <path d="M3.5 20.5h17" />
    </>
  ),
  // রসিদের ওপর %
  '/income-tax/': (
    <>
      <path d="M6 3.5h12v17l-2-1.4-2 1.4-2-1.4-2 1.4-2-1.4-2 1.4z" />
      <path d="m9.2 14.2 5.6-5.6" />
      <circle cx="9.6" cy="9" r="1.1" />
      <circle cx="14.4" cy="13.8" r="1.1" />
    </>
  ),
  // বিদ্যুৎ
  '/electricity-bill/': <path d="M13.2 2.8 5.5 13.2h6l-1 8 7.8-10.6h-6z" className="ic-bolt" />,
  // কয়েনের স্তূপ
  '/zakat-calculator/': (
    <>
      <ellipse cx="9" cy="7" rx="5" ry="2.3" />
      <path d="M4 7v3.5c0 1.3 2.2 2.3 5 2.3s5-1 5-2.3V7" />
      <path d="M4 10.5V14c0 1.3 2.2 2.3 5 2.3" />
      <ellipse cx="15.5" cy="14" rx="4.5" ry="2.1" />
      <path d="M11 14v3.3c0 1.2 2 2.2 4.5 2.2s4.5-1 4.5-2.2V14" />
    </>
  ),
  // মসজিদের গম্বুজ আর চাঁদ
  '/prayer-times/': (
    <>
      <path d="M5 20.5v-6.5a7 5 0 0 1 14 0v6.5" />
      <path d="M3.5 20.5h17" />
      <path d="M10 20.5v-3a2 2 0 0 1 4 0v3" />
      <path d="M12 9V6.8" />
      <path d="M13.4 3.2a1.8 1.8 0 1 0 0 3.2 2.3 2.3 0 0 1 0-3.2z" />
    </>
  ),
  // ক্যালেন্ডার
  '/bangla-date/': (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
      <path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01" strokeWidth="2.6" />
    </>
  ),
  // অ → A
  '/bijoy-to-unicode/': (
    <>
      <text x="1.5" y="12.5" fontSize="10.5" fontWeight="800" stroke="none" fill="currentColor">অ</text>
      <path d="M12.5 14.5h7m-2.5-2.5 2.5 2.5-2.5 2.5" />
      <text x="13.4" y="10" fontSize="8.5" fontWeight="800" stroke="none" fill="currentColor">A</text>
    </>
  ),
  // A → অ
  '/unicode-to-bijoy/': (
    <>
      <text x="2.5" y="11" fontSize="9" fontWeight="800" stroke="none" fill="currentColor">A</text>
      <path d="M4.5 14.5h7m-2.5-2.5 2.5 2.5-2.5 2.5" />
      <text x="12.4" y="11.5" fontSize="10" fontWeight="800" stroke="none" fill="currentColor">অ</text>
    </>
  ),
  // জমির প্লট আর মাপের দাগ
  '/land-converter/': (
    <>
      <path d="M4 7.5 12 4l8 3.5v9L12 20l-8-3.5z" />
      <path d="M12 4v16M4 12l8 3.5 8-3.5" />
    </>
  ),
};

export function ToolIcon({ href, fallback }: { href: string; fallback: string }) {
  const icon = ICONS[href];
  if (!icon) return <>{fallback}</>;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" className="ic">
      {icon}
    </svg>
  );
}
