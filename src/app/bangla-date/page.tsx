import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { BanglaDateConverter } from '@/components/calculators/BanglaDateConverter';
import { BN_MONTHS, monthLengths, toBangla } from '@/lib/banglaDate';
import { bn } from '@/lib/format';

export const metadata: Metadata = {
  title: 'আজকের বাংলা তারিখ — বাংলা ক্যালেন্ডার ও তারিখ কনভার্টার',
  description:
    'আজ বাংলা কত তারিখ? ইংরেজি তারিখকে বাংলা (বঙ্গাব্দ) তারিখে আর বাংলা তারিখকে ইংরেজিতে রূপান্তর করুন। বাংলা একাডেমির সংশোধিত পঞ্জিকা অনুযায়ী।',
  alternates: { canonical: '/bangla-date/' },
};

// বিল্ডের দিনের তারিখ (সাইট প্রতিদিন নতুন করে বিল্ড হয়); ব্রাউজারে আবার আজকের তারিখ বসে
const buildIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());

export default function BanglaDatePage() {
  const today = toBangla(buildIso)!;
  const lengths = monthLengths(today.year + 593);
  return (
    <ToolPage
      title="বাংলা তারিখ কনভার্টার (বঙ্গাব্দ)"
      lead="যেকোনো ইংরেজি তারিখের বাংলা তারিখ, বার আর ঋতু দেখুন। বাংলা তারিখ থেকে ইংরেজি তারিখও বের করা যায়।"
      path="/bangla-date/"
      calculator={<BanglaDateConverter initialIso={buildIso} />}
      faq={[
        {
          q: 'বাংলা মাসগুলো কত দিনের?',
          a: 'বৈশাখ থেকে আশ্বিন ছয় মাস ৩১ দিন করে, কার্তিক থেকে মাঘ আর চৈত্র ৩০ দিন করে, আর ফাল্গুন ২৯ দিনের। ইংরেজি অধিবর্ষে ফাল্গুন ৩০ দিনের হয়।',
        },
        {
          q: 'পহেলা বৈশাখ কেন সবসময় ১৪ এপ্রিল?',
          a: 'বাংলা একাডেমির সংশোধিত পঞ্জিকায় মাসের দৈর্ঘ্য স্থির করা হয়েছে, তাই বাংলাদেশে পহেলা বৈশাখ প্রতিবছর ১৪ এপ্রিল। পশ্চিমবঙ্গের পঞ্জিকা চাঁদ-সূর্যের অবস্থান ধরে হয়, তাই সেখানে তারিখ এক-আধ দিন আলাদা হতে পারে।',
        },
        {
          q: 'বঙ্গাব্দ কীভাবে বের করব?',
          a: '১৪ এপ্রিল বা তার পরে হলে ইংরেজি সাল থেকে ৫৯৩ বাদ দিন, আর ১৪ এপ্রিলের আগে হলে ৫৯৪ বাদ দিন। যেমন ২০২৬ সালের অক্টোবর = ১৪৩৩ বঙ্গাব্দ।',
        },
      ]}
    >
      <h2>{bn(today.year, 0).replace(/,/g, '')} বঙ্গাব্দের মাস</h2>
      <table>
        <thead>
          <tr>
            <th>মাস</th>
            <th>ঋতু</th>
            <th className="num">দিন</th>
          </tr>
        </thead>
        <tbody>
          {BN_MONTHS.map((m, i) => (
            <tr key={m}>
              <td>{m}</td>
              <td>{['গ্রীষ্ম', 'বর্ষা', 'শরৎ', 'হেমন্ত', 'শীত', 'বসন্ত'][Math.floor(i / 2)]}</td>
              <td className="num">{bn(lengths[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>কিছু স্থির জাতীয় দিবস</h2>
      <ul>
        <li>২১ ফেব্রুয়ারি = ৮ ফাল্গুন (শহীদ দিবস ও আন্তর্জাতিক মাতৃভাষা দিবস)</li>
        <li>২৬ মার্চ = ১২ চৈত্র (স্বাধীনতা দিবস)</li>
        <li>১৪ এপ্রিল = ১ বৈশাখ (বাংলা নববর্ষ)</li>
        <li>১৬ ডিসেম্বর = ১ পৌষ (বিজয় দিবস)</li>
      </ul>
    </ToolPage>
  );
}
