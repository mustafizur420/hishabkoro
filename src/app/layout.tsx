import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { site } from '@/config/site';
import { groups, tools } from '@/data/tools';
// ফন্ট সাইটের সঙ্গেই থাকে। লাতিন: Plus Jakarta Sans + DM Sans (পোর্টফোলিওর মতো), বাংলা: Anek Bangla + Hind Siliguri
import '@fontsource/plus-jakarta-sans/latin-700.css';
import '@fontsource/plus-jakarta-sans/latin-800.css';
import '@fontsource/dm-sans/latin-400.css';
import '@fontsource/dm-sans/latin-600.css';
import '@fontsource/anek-bangla/bengali-700.css';
import '@fontsource/anek-bangla/bengali-800.css';
import '@fontsource/hind-siliguri/bengali-400.css';
import '@fontsource/hind-siliguri/bengali-600.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — CGPA, EMI, বয়স ও জমির মাপ ক্যালকুলেটর`,
    template: `%s | ${site.name}`,
  },
  description:
    'CGPA calculator, EMI calculator, age calculator, বিজয়-ইউনিকোড কনভার্টার আর জমির মাপ — বাংলাদেশিদের প্রতিদিনের হিসাবের ফ্রি টুল, বাংলায়।',
  openGraph: { siteName: site.name, locale: 'bn_BD', type: 'website' },
};

export const viewport: Viewport = { themeColor: '#f6f3ee', width: 'device-width', initialScale: 1 };

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
          <div className="wrap nav">
            <Link href="/" className="logo" aria-label={`${site.name} — হোম`}>
              {site.name}
              <span className="dot">.</span>
            </Link>
            <nav aria-label="প্রধান">
              <ul className="nav-links">
                <li className="hide-sm">
                  <Link href="/cgpa/">CGPA</Link>
                </li>
                <li className="hide-sm">
                  <Link href="/emi-calculator/">EMI</Link>
                </li>
                <li className="hide-sm">
                  <Link href="/bijoy-to-unicode/">বিজয়-ইউনিকোড</Link>
                </li>
                <li>
                  <Link href="/#tools" className="btn dark small-btn">
                    সব টুল
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="wrap">
            <div className="foot-grid">
              <div className="foot-brand">
                <Link href="/" className="logo">
                  {site.name}
                  <span className="dot">.</span>
                </Link>
                <p>বাংলাদেশিদের প্রতিদিনের হিসাবের ফ্রি টুল। অ্যাকাউন্ট লাগে না, আপনার তথ্য ব্রাউজারের বাইরে যায় না।</p>
              </div>
              <div>
                <h3>টুল</h3>
                <ul>
                  {groups.flatMap((g) => tools.filter((t) => t.group === g)).map((t) => (
                    <li key={t.href}>
                      <Link href={t.href}>{t.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>সাইট</h3>
                <ul>
                  <li>
                    <Link href="/about/">আমাদের সম্পর্কে</Link>
                  </li>
                  <li>
                    <Link href="/contact/">যোগাযোগ</Link>
                  </li>
                  <li>
                    <Link href="/privacy/">গোপনীয়তা নীতি</Link>
                  </li>
                  <li>
                    <Link href="/terms/">শর্তাবলি</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="foot-bottom">
              <span>হিসাব তথ্যের জন্য। গুরুত্বপূর্ণ সিদ্ধান্তের আগে সংশ্লিষ্ট প্রতিষ্ঠান থেকে মিলিয়ে নিন।</span>
              <span>
                তৈরি করেছেন <a href="https://mustafiz.online">Mustafiz</a>
              </span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
