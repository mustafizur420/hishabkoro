import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
// ফন্ট সাইটের সঙ্গেই থাকে (Google Fonts-এ আলাদা রিকোয়েস্ট লাগে না, দ্রুত লোড হয়)
import '@fontsource/hind-siliguri/400.css';
import '@fontsource/hind-siliguri/600.css';
import '@fontsource/tiro-bangla/400.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — CGPA, EMI, বয়স ও জমির মাপ ক্যালকুলেটর`,
    template: `%s | ${site.name}`,
  },
  description:
    'CGPA calculator, EMI calculator, age calculator আর জমির মাপ রূপান্তর — বাংলাদেশিদের প্রতিদিনের হিসাবের ফ্রি টুল, বাংলায়।',
  openGraph: { siteName: site.name, locale: 'bn_BD', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#f3f6f8', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        {/* খালি স্ট্রিং যেন <head>-এ টেক্সট হয়ে না ঢোকে, তাই && নয়, ternary */}
        {site.adsenseClient ? (
          <script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsenseClient}`}
            crossOrigin="anonymous"
          />
        ) : null}
      </head>
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            {site.name}
          </Link>
          <nav aria-label="প্রধান">
            <Link href="/">সব টুল</Link>
          </nav>
        </header>
        <main className="sheet">{children}</main>
        <footer className="site-footer">
          <nav aria-label="সাইটের তথ্য">
            <Link href="/about/">আমাদের সম্পর্কে</Link>
            <Link href="/contact/">যোগাযোগ</Link>
            <Link href="/privacy/">গোপনীয়তা নীতি</Link>
            <Link href="/terms/">শর্তাবলি</Link>
          </nav>
          <p>
            এই সাইটের হিসাব তথ্যের জন্য। গুরুত্বপূর্ণ সিদ্ধান্তের আগে সংশ্লিষ্ট প্রতিষ্ঠান থেকে মিলিয়ে নিন।
          </p>
        </footer>
      </body>
    </html>
  );
}
