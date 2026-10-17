import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { ElectricityCalculator } from '@/components/calculators/ElectricityCalculator';
import { DEMAND_CHARGE_PER_KW, LIFELINE, RESIDENTIAL_SLABS } from '@/lib/electricity';
import { bn } from '@/lib/format';

export const metadata: Metadata = {
  title: 'বিদ্যুৎ বিল ক্যালকুলেটর ২০২৬ — Electricity Bill Calculator BD',
  description:
    'ইউনিট দিলেই বিদ্যুৎ বিল কত হবে দেখুন। BERC-এর জুন ২০২৬ থেকে কার্যকর আবাসিক দর, ডিমান্ড চার্জ আর ৫% ভ্যাটসহ। DESCO, DPDC, পল্লী বিদ্যুৎ সবার জন্য।',
  alternates: { canonical: '/electricity-bill/' },
};

export default function ElectricityPage() {
  let from = 1;
  return (
    <ToolPage
      title="বিদ্যুৎ বিল ক্যালকুলেটর (Electricity Bill)"
      lead="এই মাসে কত ইউনিট খরচ হয়েছে দিন। ধাপে ধাপে বিল, ডিমান্ড চার্জ আর ভ্যাটসহ মোট কত টাকা আসবে দেখাবে।"
      path="/electricity-bill/"
      calculator={<ElectricityCalculator />}
      faq={[
        {
          q: 'বিদ্যুৎ বিল কীভাবে হিসাব হয়?',
          a: 'আবাসিক বিল ধাপে ধাপে হয়: প্রথম ৭৫ ইউনিট এক দরে, পরের ১২৫ ইউনিট আরেক দরে, এভাবে। তার সঙ্গে অনুমোদিত লোডের ওপর ডিমান্ড চার্জ আর সবকিছুর ওপর ৫% ভ্যাট যোগ হয়।',
        },
        {
          q: 'লাইফলাইন গ্রাহক কারা?',
          a: `যাদের মাসে মোট ব্যবহার ${bn(LIFELINE.maxUnits)} ইউনিট বা তার কম, তারা সব ইউনিট সবচেয়ে কম দরে (প্রতি ইউনিট ${bn(LIFELINE.rate, 2, 2)} টাকা) পান।`,
        },
        {
          q: 'আমার আসল বিলের সঙ্গে সামান্য পার্থক্য কেন?',
          a: 'মিটার ভাড়া, প্রিপেইড মিটারের রিবেট বা বকেয়া বিতরণ কোম্পানিভেদে আলাদা। এগুলো এখানে ধরা হয়নি, তাই কয়েক টাকা পার্থক্য হতে পারে।',
        },
        {
          q: 'জুন ২০২৬-এ কি বিদ্যুতের দাম বেড়েছে?',
          a: 'হ্যাঁ, BERC জুন ২০২৬ থেকে ৭৬ ইউনিটের ওপরের সব ধাপে দর বাড়িয়েছে। ৫০ আর ৭৫ ইউনিট পর্যন্ত দর বাড়ানোর সিদ্ধান্ত পরদিন প্রত্যাহার করা হয়, তাই সেগুলো আগের দরেই আছে।',
        },
      ]}
    >
      <h2>আবাসিক বিদ্যুতের দর (জুন ২০২৬ থেকে)</h2>
      <table>
        <thead>
          <tr>
            <th>মাসিক ব্যবহার</th>
            <th className="num">প্রতি ইউনিট</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>লাইফলাইন (মোট ০–৫০ ইউনিট)</td>
            <td className="num">৳{bn(LIFELINE.rate, 2, 2)}</td>
          </tr>
          {RESIDENTIAL_SLABS.map(([size, rate]) => {
            const row = (
              <tr key={rate}>
                <td>{size === Infinity ? `${bn(from)} ইউনিটের ওপরে` : `${bn(from)}–${bn(from + size - 1)} ইউনিট`}</td>
                <td className="num">৳{bn(rate, 2, 2)}</td>
              </tr>
            );
            from += size;
            return row;
          })}
        </tbody>
      </table>
      <p>
        ডিমান্ড চার্জ প্রতি কিলোওয়াট অনুমোদিত লোডে মাসে ৳{bn(DEMAND_CHARGE_PER_KW)}। মোট বিলের ওপর ৫% ভ্যাট।
      </p>
      <p className="small">
        সূত্র: বাংলাদেশ এনার্জি রেগুলেটরি কমিশনের (BERC) জুন ২০২৬-এর দর, বণিক বার্তা ও দ্য ডেইলি স্টার (৪ জুন ২০২৬), বাসস (৪ জুন
        ২০২৬)।
      </p>
    </ToolPage>
  );
}
