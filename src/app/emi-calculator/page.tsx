import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { EmiCalculator } from '@/components/calculators/EmiCalculator';

export const metadata: Metadata = {
  title: 'EMI Calculator — লোনের মাসিক কিস্তি ও সুদ হিসাব (Bangladesh)',
  description:
    'ফ্রি loan EMI calculator: লোনের পরিমাণ, সুদের হার আর মেয়াদ দিয়ে মাসিক কিস্তি, মোট সুদ ও মোট পরিশোধ টাকায় হিসাব করুন।',
  alternates: { canonical: '/emi-calculator/' },
};

export default function EmiPage() {
  return (
    <ToolPage
      title="EMI Calculator — লোনের কিস্তি হিসাব"
      lead="লোনের পরিমাণ, বার্ষিক সুদের হার আর মেয়াদ দিন। মাসিক কিস্তি আর মোট কত সুদ দেবেন, দেখাবে।"
      path="/emi-calculator/"
      calculator={<EmiCalculator />}
      faq={[
        {
          q: 'EMI কী?',
          a: 'EMI হলো প্রতি মাসে দেওয়া সমান কিস্তি। প্রতিটা কিস্তিতে মূল টাকার কিছু অংশ আর সুদ থাকে।',
        },
        {
          q: 'ব্যাংকের কিস্তির সঙ্গে হিসাব মিলছে না কেন?',
          a: 'ব্যাংক প্রসেসিং ফি, ইন্স্যুরেন্স বা ভিন্ন হিসাব পদ্ধতি যোগ করতে পারে। এখানে প্রচলিত হ্রাসমান স্থিতি (reducing balance) পদ্ধতি ধরা হয়েছে।',
        },
        {
          q: 'ফ্ল্যাট রেট আর রিডিউসিং রেটের পার্থক্য কী?',
          a: 'ফ্ল্যাট রেটে পুরো মেয়াদে মূল লোনের ওপর সুদ ধরা হয়, তাই আসল খরচ বেশি পড়ে। রিডিউসিং রেটে প্রতি মাসে বাকি থাকা টাকার ওপর সুদ ধরা হয়।',
        },
      ]}
    >
      <h2>EMI-র সূত্র</h2>
      <p className="formula">EMI = P × r × (1 + r)ⁿ ÷ ((1 + r)ⁿ − 1)</p>
      <p>
        এখানে P = লোনের পরিমাণ, r = মাসিক সুদের হার (বার্ষিক হার ÷ ১২ ÷ ১০০), আর n = মোট কিস্তির সংখ্যা। যেমন ১,০০,০০০
        টাকা ১২% সুদে ১২ মাসে নিলে মাসিক কিস্তি প্রায় ৮,৮৮৫ টাকা।
      </p>
    </ToolPage>
  );
}
