import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { LandConverter } from '@/components/calculators/LandConverter';

export const metadata: Metadata = {
  title: 'জমির মাপ ক্যালকুলেটর — শতাংশ, কাঠা, বিঘা, একর রূপান্তর',
  description:
    '১ কাঠা কত শতাংশ, ১ বিঘা কত কাঠা, ১ শতাংশ কত বর্গফুট — জমির সব প্রচলিত মাপ এক জায়গায় রূপান্তর করুন। ফ্রি, বাংলায়।',
  alternates: { canonical: '/land-converter/' },
};

export default function LandPage() {
  return (
    <ToolPage
      title="জমির মাপ ক্যালকুলেটর"
      lead="পরিমাণ আর একক দিন। শতাংশ, কাঠা, বিঘা, একর, বর্গফুট আর বর্গমিটারে একসঙ্গে দেখাবে।"
      path="/land-converter/"
      calculator={<LandConverter />}
      faq={[
        { q: '১ শতাংশ সমান কত বর্গফুট?', a: '১ শতাংশ (ডেসিমাল) = ৪৩৫.৬ বর্গফুট, অর্থাৎ ১ একরের ১০০ ভাগের ১ ভাগ।' },
        { q: '১ কাঠা সমান কত শতাংশ?', a: '১ কাঠা = ৭২০ বর্গফুট, যা প্রায় ১.৬৫ শতাংশ।' },
        { q: '১ বিঘা সমান কত কাঠা?', a: '১ বিঘা = ২০ কাঠা = ১৪,৪০০ বর্গফুট, যা প্রায় ৩৩ শতাংশ।' },
        {
          q: 'সব এলাকায় কি কাঠা আর বিঘার মাপ একই?',
          a: 'না। এখানে ঢাকাসহ বেশিরভাগ এলাকার প্রচলিত মাপ ধরা হয়েছে। কিছু অঞ্চলে কাঠা বা বিঘার মাপ আলাদা। দলিল বা রেজিস্ট্রির আগে স্থানীয় ভূমি অফিস থেকে মিলিয়ে নিন।',
        },
      ]}
    >
      <h2>প্রচলিত মাপের হিসাব</h2>
      <table>
        <tbody>
          <tr><td>১ একর</td><td className="num">১০০ শতাংশ = ৪৩,৫৬০ বর্গফুট</td></tr>
          <tr><td>১ বিঘা</td><td className="num">২০ কাঠা = ১৪,৪০০ বর্গফুট</td></tr>
          <tr><td>১ কাঠা</td><td className="num">৭২০ বর্গফুট</td></tr>
          <tr><td>১ শতাংশ</td><td className="num">৪৩৫.৬ বর্গফুট = ১০০ অযুতাংশ</td></tr>
          <tr><td>১ বর্গমিটার</td><td className="num">১০.৭৬ বর্গফুট</td></tr>
        </tbody>
      </table>
      <p className="small" style={{ marginTop: 8 }}>
        কাঠা ও বিঘার মাপ কিছু অঞ্চলে ভিন্ন হতে পারে। এখানে সবচেয়ে প্রচলিত মাপ ধরা হয়েছে।
      </p>
    </ToolPage>
  );
}
