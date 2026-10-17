import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ToolPage } from '@/components/ToolPage';
import { PrayerTimesTool } from '@/components/calculators/PrayerTimesTool';
import { PrayerMonthTable } from '@/components/PrayerMonthTable';
import { districts, findDistrict } from '@/data/districts';
import { todayInDhaka } from '@/lib/prayer';

type Params = { slug: string };

export const dynamicParams = false;
export function generateStaticParams(): Params[] {
  return districts.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const d = findDistrict((await params).slug);
  if (!d) return {};
  return {
    title: `${d.bn} নামাজের সময়সূচি, সেহরি ও ইফতারের সময় — ${d.en} Prayer Time`,
    description: `আজ ${d.bn} জেলায় ফজর, যোহর, আসর, মাগরিব, এশার সময় আর সেহরি-ইফতারের সময়। পুরো মাসের সময়সূচিসহ।`,
    alternates: { canonical: `/prayer-times/${d.slug}/` },
  };
}

export default async function DistrictPrayerPage({ params }: { params: Promise<Params> }) {
  const d = findDistrict((await params).slug);
  if (!d) notFound();
  const today = todayInDhaka();
  const neighbours = districts.filter((x) => x.division === d.division && x.slug !== d.slug);

  return (
    <ToolPage
      title={`${d.bn} নামাজের সময়সূচি`}
      lead={`আজ ${d.bn} জেলায় পাঁচ ওয়াক্ত নামাজ, সেহরি আর ইফতারের সময়। অন্য তারিখ বা জেলা বেছেও দেখতে পারেন।`}
      path={`/prayer-times/${d.slug}/`}
      calculator={<PrayerTimesTool slug={d.slug} initialDate={today} />}
      faq={[
        {
          q: `${d.bn} জেলায় সময় কীভাবে হিসাব করা হয়?`,
          a: `${d.bn} জেলা সদরের অক্ষাংশ-দ্রাঘিমাংশ ধরে সূর্যের অবস্থান থেকে হিসাব করা হয়েছে: ফজর ও এশা সূর্য দিগন্তের ১৮° নিচে থাকলে, আসর হানাফি মাজহাব অনুযায়ী। জেলার ভেতরে দূরের এলাকায় ১-২ মিনিট পার্থক্য হতে পারে।`,
        },
        {
          q: 'সেহরির শেষ সময় আর ফজরের সময় আলাদা কেন?',
          a: 'সেহরির শেষ সময় হিসাবে আসা সুবহে সাদিকের সময়, আর ফজরের সময়ে কয়েক মিনিট সতর্কতা যোগ করা থাকে। নিরাপদ থাকতে সেহরি আরও কয়েক মিনিট আগে শেষ করুন।',
        },
        {
          q: 'ইফতারের সময় কীভাবে ঠিক করা হয়?',
          a: 'সূর্যাস্তের পর বাংলাদেশের প্রচলিত সময়সূচির মতো ৩ মিনিট সতর্কতা যোগ করে মাগরিব ও ইফতারের সময় দেখানো হয়েছে।',
        },
      ]}
    >
      <PrayerMonthTable district={d} year={today[0]} month={today[1]} today={today[2]} />
      {neighbours.length > 0 && (
        <>
          <h2>{d.division} বিভাগের অন্য জেলা</h2>
          <ul className="district-links">
            {neighbours.map((n) => (
              <li key={n.slug}>
                <Link href={`/prayer-times/${n.slug}/`}>{n.bn}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="small" style={{ marginTop: 16 }}>
        <Link href="/prayer-times/">সব ৬৪ জেলার নামাজের সময়সূচি</Link>
      </p>
    </ToolPage>
  );
}
