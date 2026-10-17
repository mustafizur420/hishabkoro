import type { Metadata } from 'next';
import Link from 'next/link';
import { ToolPage } from '@/components/ToolPage';
import { PrayerTimesTool } from '@/components/calculators/PrayerTimesTool';
import { DEFAULT_DISTRICT, districts } from '@/data/districts';
import { todayInDhaka } from '@/lib/prayer';

export const metadata: Metadata = {
  title: 'আজকের নামাজের সময়সূচি — ৬৪ জেলার সেহরি ও ইফতারের সময়',
  description:
    'বাংলাদেশের ৬৪ জেলার আজকের নামাজের সময়সূচি, সেহরি ও ইফতারের সময়। জেলা বেছে নিন, পরবর্তী ওয়াক্ত কখন আর পুরো মাসের সময়সূচি দেখুন।',
  alternates: { canonical: '/prayer-times/' },
};

export default function PrayerIndexPage() {
  const divisions = [...new Set(districts.map((d) => d.division))].sort((a, b) => a.localeCompare(b, 'bn'));
  return (
    <ToolPage
      title="নামাজের সময়সূচি, সেহরি ও ইফতার"
      lead="জেলা বেছে নিন। আজকের পাঁচ ওয়াক্ত নামাজ, পরবর্তী ওয়াক্ত কখন, আর সেহরি-ইফতারের সময় দেখাবে।"
      path="/prayer-times/"
      calculator={<PrayerTimesTool slug={DEFAULT_DISTRICT} initialDate={todayInDhaka()} />}
      faq={[
        {
          q: 'কোন পদ্ধতিতে সময় হিসাব করা হয়?',
          a: 'বাংলাদেশে প্রচলিত পদ্ধতিতে: ফজর ও এশা সূর্য দিগন্তের ১৮° নিচে, আসর হানাফি মাজহাব অনুযায়ী, আর ইসলামিক ফাউন্ডেশন-ভিত্তিক সময়সূচির মতো কয়েক মিনিট সতর্কতা যোগ করে।',
        },
        {
          q: 'এক জেলা থেকে আরেক জেলায় সময় কতটা আলাদা?',
          a: 'পূর্ব থেকে পশ্চিমে সময় পিছিয়ে যায়। যেমন সিলেটের চেয়ে রাজশাহীতে মাগরিব সারা বছর ১২ থেকে ১৪ মিনিট পরে হয়।',
        },
      ]}
    >
      <h2>জেলা অনুযায়ী নামাজের সময়সূচি</h2>
      {divisions.map((div) => (
        <div key={div}>
          <h3 style={{ marginTop: 18, marginBottom: 6 }}>{div} বিভাগ</h3>
          <ul className="district-links">
            {districts
              .filter((d) => d.division === div)
              .map((d) => (
                <li key={d.slug}>
                  <Link href={`/prayer-times/${d.slug}/`}>{d.bn}</Link>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </ToolPage>
  );
}
