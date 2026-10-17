import type { Metadata } from 'next';
import Link from 'next/link';
import { ToolPage } from '@/components/ToolPage';
import { CgpaCalculator } from '@/components/calculators/CgpaCalculator';
import { standardScale } from '@/lib/cgpa';
import { universities } from '@/data/universities';
import { bn } from '@/lib/format';
import { cgpaFaq, GradeTable } from './shared';

export const metadata: Metadata = {
  title: 'CGPA Calculator — সেমিস্টার GPA ও CGPA হিসাব (Bangladesh)',
  description:
    'ফ্রি CGPA calculator: কোর্সের ক্রেডিট আর গ্রেড দিয়ে সেমিস্টারের GPA এবং আগের ফলাফলসহ মোট CGPA বের করুন। বাংলাদেশের ৪.০০ স্কেলে।',
  alternates: { canonical: '/cgpa/' },
};

export default function CgpaPage() {
  return (
    <ToolPage
      title="CGPA Calculator — সিজিপিএ হিসাব"
      lead="প্রতিটা কোর্সের ক্রেডিট আর গ্রেড দিন। সেমিস্টারের GPA সঙ্গে সঙ্গে দেখাবে, আগের CGPA দিলে নতুন মোট CGPA-ও।"
      path="/cgpa/"
      calculator={<CgpaCalculator scale={standardScale} />}
      faq={cgpaFaq}
    >
      <h2>CGPA কীভাবে হিসাব হয়</h2>
      <p>
        প্রতিটা কোর্সের গ্রেড পয়েন্টকে তার ক্রেডিট দিয়ে গুণ করা হয়। সব গুণফল যোগ করে মোট ক্রেডিট দিয়ে ভাগ করলে GPA পাওয়া
        যায়। যেমন ৩ ক্রেডিটে A (৩.৭৫) আর ১.৫ ক্রেডিটে B (৩.০০) পেলে GPA = (৩ × ৩.৭৫ + ১.৫ × ৩.০০) ÷ ৪.৫ = ৩.৫০।
      </p>
      <p>CGPA একই নিয়মে হয়, তবে শুধু এক সেমিস্টারের বদলে এখন পর্যন্ত সব কোর্স ধরে।</p>

      <h2>প্রচলিত গ্রেডিং স্কেল</h2>
      <GradeTable scale={standardScale} />
      <p className="small">
        বাংলাদেশের বেশিরভাগ বিশ্ববিদ্যালয় এই ৪.০০ স্কেল ব্যবহার করে। আপনার বিশ্ববিদ্যালয়ের স্কেল আলাদা হলে নিচের তালিকা থেকে
        বাছুন।
      </p>

      {universities.length > 0 && (
        <>
          <h2>বিশ্ববিদ্যালয় অনুযায়ী CGPA ক্যালকুলেটর</h2>
          <ul>
            {universities.map((u) => (
              <li key={u.slug}>
                <Link href={`/cgpa/${u.slug}/`}>
                  {u.nameEn} CGPA Calculator ({u.name})
                </Link>
              </li>
            ))}
          </ul>
          <p className="small">মোট {bn(universities.length)}টি বিশ্ববিদ্যালয়। নতুন যোগ হচ্ছে।</p>
        </>
      )}
    </ToolPage>
  );
}
