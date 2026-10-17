import type { Metadata } from 'next';
import { ToolPage } from '@/components/ToolPage';
import { IncomeTaxCalculator } from '@/components/calculators/IncomeTaxCalculator';
import { CATEGORIES, MIN_TAX, MIN_TAX_NEW, SLABS } from '@/lib/tax';
import { bn } from '@/lib/format';

export const metadata: Metadata = {
  title: 'Income Tax Calculator BD 2026-27 — আয়কর ক্যালকুলেটর',
  description:
    'বাংলাদেশের আয়কর ক্যালকুলেটর, আয়বর্ষ ২০২৬-২৭। করমুক্ত সীমা ৪ লাখ টাকা, নতুন ট্যাক্স স্ল্যাব, বিনিয়োগ রেয়াত আর ন্যূনতম করসহ কত কর দিতে হবে দেখুন।',
  alternates: { canonical: '/income-tax/' },
};

export default function IncomeTaxPage() {
  let from = 0;
  return (
    <ToolPage
      title="Income Tax Calculator — আয়কর হিসাব ২০২৬-২৭"
      lead="মাসিক বা বার্ষিক করযোগ্য আয় দিন। নতুন স্ল্যাব অনুযায়ী কত কর, বিনিয়োগে কত রেয়াত, আর মাসে কত পড়ে — সব দেখাবে।"
      path="/income-tax/"
      calculator={<IncomeTaxCalculator />}
      faq={[
        {
          q: '২০২৬-২৭ আয়বর্ষে করমুক্ত আয়ের সীমা কত?',
          a: 'সাধারণ করদাতার জন্য ৪,০০,০০০ টাকা। নারী ও ৬৫ বছরের বেশি বয়সীদের ৪,৫০,০০০, প্রতিবন্ধী ও তৃতীয় লিঙ্গের করদাতার ৫,২৫,০০০, আর যুদ্ধাহত গেজেটভুক্ত মুক্তিযোদ্ধা ও আহত জুলাই যোদ্ধার ৫,৫০,০০০ টাকা।',
        },
        {
          q: 'বিনিয়োগ রেয়াত কীভাবে হিসাব হয়?',
          a: 'তিনটার মধ্যে যেটা সবচেয়ে কম: করযোগ্য আয়ের ৩%, রেয়াতযোগ্য বিনিয়োগের ১০%, অথবা ৭,৫০,০০০ টাকা। সঞ্চয়পত্র, DPS, জীবনবিমার প্রিমিয়াম, স্বীকৃত প্রভিডেন্ট ফান্ডে জমা ইত্যাদি এর মধ্যে পড়ে।',
        },
        {
          q: 'আয় করমুক্ত সীমার সামান্য বেশি হলেও কি কর দিতে হবে?',
          a: `হ্যাঁ। আয় করমুক্ত সীমা ছাড়ালে হিসাবে কর কম এলেও ন্যূনতম ${bn(MIN_TAX, 0)} টাকা দিতে হয়। প্রথমবার রিটার্ন দিলে ন্যূনতম কর ${bn(MIN_TAX_NEW, 0)} টাকা।`,
        },
        {
          q: 'বেতনভোগীরা করযোগ্য আয় কীভাবে বের করবেন?',
          a: 'মোট বেতন থেকে আইনে করমুক্ত অংশ বাদ দিয়ে করযোগ্য আয় হয়। আপনার অফিসের হিসাব বিভাগ বা রিটার্নের ফরমের নির্দেশনা দেখে করযোগ্য আয়টা এখানে দিন।',
        },
      ]}
    >
      <h2>২০২৬-২৭ আয়বর্ষের ট্যাক্স স্ল্যাব</h2>
      <table>
        <thead>
          <tr>
            <th>আয়ের ধাপ</th>
            <th className="num">করহার</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>করমুক্ত সীমা পর্যন্ত (সাধারণ করদাতার ৪,০০,০০০)</td>
            <td className="num">০%</td>
          </tr>
          {SLABS.map(([size, rate]) => {
            const row = (
              <tr key={rate}>
                <td>{size === Infinity ? 'বাকি সব আয়' : `${from === 0 ? 'করমুক্ত সীমার পরের' : 'তার পরের'} ${bn(size, 0)} টাকা`}</td>
                <td className="num">{bn(rate)}%</td>
              </tr>
            );
            from += size;
            return row;
          })}
        </tbody>
      </table>
      <h2>করদাতার ধরন অনুযায়ী করমুক্ত সীমা</h2>
      <table>
        <tbody>
          {CATEGORIES.map((c) => (
            <tr key={c.id}>
              <td>{c.label}</td>
              <td className="num">{bn(c.threshold, 0)} টাকা</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="small">
        সূত্র: অর্থ আইন ২০২৬ (জুন ২০২৬-এ পাস), PwC Worldwide Tax Summaries (৩১ জুলাই ২০২৬ পর্যালোচিত)। রিটার্ন জমার আগে NBR-এর
        নির্দেশনা মিলিয়ে নিন।
      </p>
    </ToolPage>
  );
}
