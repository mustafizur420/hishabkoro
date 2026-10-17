import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { BijoyConverter } from '@/components/calculators/BijoyConverter';

export const metadata: Metadata = {
  title: 'Unicode to Bijoy Converter — ইউনিকোড থেকে বিজয় (SutonnyMJ)',
  description:
    'ইউনিকোড বাংলা লেখা এক ক্লিকে বিজয় (SutonnyMJ) ফরম্যাটে রূপান্তর করুন। Word, প্রেস আর ডিজাইনের কাজে ব্যবহারের জন্য। ফ্রি, অনলাইন।',
  alternates: { canonical: '/unicode-to-bijoy/' },
};

export default function UnicodeToBijoyPage() {
  return (
    <ToolPage
      title="Unicode to Bijoy — ইউনিকোড থেকে বিজয়"
      lead="ইউনিকোড বাংলা পেস্ট করুন। বিজয় (SutonnyMJ) টেক্সট সঙ্গে সঙ্গে আসবে। কপি করে Word-এ পেস্ট করে ফন্ট SutonnyMJ দিন।"
      path="/unicode-to-bijoy/"
      calculator={<BijoyConverter direction="unicode-to-bijoy" />}
      faq={[
        {
          q: 'রূপান্তরের পর লেখা ইংরেজি অক্ষরের মতো দেখাচ্ছে কেন?',
          a: 'বিজয় ফরম্যাট এমনই। Word, Photoshop বা Illustrator-এ পেস্ট করে ফন্ট SutonnyMJ (বা অন্য কোনো MJ ফন্ট) বাছলে ঠিক বাংলা দেখাবে।',
        },
        {
          q: 'ইউনিকোড থেকে বিজয়ে কেন রূপান্তর করতে হয়?',
          a: 'অনেক প্রেস, অফিস আর পুরনো ডিজাইন সফটওয়্যার এখনো বিজয়ের ফন্ট ব্যবহার করে, যেখানে ইউনিকোড বাংলা ভেঙে যায়। তখন বিজয়ে রূপান্তর করে নিতে হয়।',
        },
        {
          q: 'রূপান্তর কি ১০০% নির্ভুল?',
          a: 'প্রচলিত শব্দ আর যুক্তাক্ষর সঠিকভাবে রূপান্তর হয়। খুব বিরল যুক্তাক্ষর থাকলে ছাপার আগে একবার মিলিয়ে নিন।',
        },
        {
          q: 'আমার লেখা কি কোথাও পাঠানো হয়?',
          a: 'না। রূপান্তর পুরোপুরি আপনার ব্রাউজারে হয়, লেখা কোনো সার্ভারে যায় না।',
        },
      ]}
    >
      <h2>কোথায় কাজে লাগে</h2>
      <p>
        ফোন বা ওয়েবসাইট থেকে কপি করা বাংলা লেখা প্রেসে ছাপা, পুরনো Word টেমপ্লেট বা Photoshop-এর ডিজাইনে বসাতে গেলে প্রায়ই
        অক্ষর ভেঙে যায়। বিজয় ফরম্যাটে রূপান্তর করে SutonnyMJ ফন্টে বসালে লেখা ঠিকঠাক দেখায়।
      </p>
    </ToolPage>
  );
}
