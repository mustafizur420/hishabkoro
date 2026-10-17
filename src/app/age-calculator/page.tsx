import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { AgeCalculator } from '@/components/calculators/AgeCalculator';

export const metadata: Metadata = {
  title: 'Age Calculator — বয়স ক্যালকুলেটর, চাকরির আবেদনের তারিখে বয়স',
  description:
    'ফ্রি age calculator: জন্মতারিখ দিয়ে আজ বা যেকোনো তারিখে আপনার বয়স বছর, মাস ও দিনে বের করুন। সরকারি চাকরির বয়সসীমা মেলাতে কাজে লাগে।',
  alternates: { canonical: '/age-calculator/' },
};

export default function AgePage() {
  return (
    <ToolPage
      title="বয়স ক্যালকুলেটর (Age Calculator)"
      lead="জন্মতারিখ দিন। আজ বা আপনার বেছে নেওয়া যেকোনো তারিখে বয়স কত, বছর-মাস-দিনে দেখাবে।"
      path="/age-calculator/"
      calculator={<AgeCalculator />}
      faq={[
        {
          q: 'চাকরির আবেদনে কোন তারিখ ধরে বয়স গুনব?',
          a: 'প্রতিটা সার্কুলারে বয়স গোনার তারিখ লেখা থাকে, যেমন আবেদন শুরুর বা নির্দিষ্ট কোনো তারিখ। দ্বিতীয় ঘরে সেই তারিখটা দিন।',
        },
        {
          q: '২৯ ফেব্রুয়ারি জন্মদিন হলে কীভাবে গোনা হয়?',
          a: 'যে বছর ফেব্রুয়ারি ২৮ দিনের, সে বছর ২৮ ফেব্রুয়ারিতে এক বছর পূর্ণ ধরা হয়েছে।',
        },
        { q: 'তথ্য কি কোথাও সেভ হয়?', a: 'না, পুরো হিসাব আপনার ব্রাউজারেই হয়।' },
      ]}
    >
      <h2>বয়স কীভাবে গোনা হয়</h2>
      <p>
        জন্মতারিখ থেকে প্রথমে পূর্ণ মাসগুলো গোনা হয়, তারপর বাকি দিন। ১২ মাস হলে এক বছর। মাসের শেষ দিনে জন্ম হলে, যে মাসে
        দিন কম, সে মাসের শেষ দিনে মাস পূর্ণ ধরা হয়।
      </p>
    </ToolPage>
  );
}
