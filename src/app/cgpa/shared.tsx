import type { GradeRow } from '@/lib/cgpa';
import type { FaqItem } from '@/components/Faq';
import { bn } from '@/lib/format';

export function GradeTable({ scale }: { scale: GradeRow[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>নম্বর</th>
          <th>লেটার গ্রেড</th>
          <th className="num">গ্রেড পয়েন্ট</th>
        </tr>
      </thead>
      <tbody>
        {scale.map((g, i) => {
          const upper = i === 0 ? 100 : scale[i - 1].minMarks - 1;
          return (
            <tr key={g.letter}>
              <td>
                {bn(g.minMarks)}–{bn(upper)}
              </td>
              <td>{g.letter}</td>
              <td className="num">{bn(g.point, 2, 2)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export const cgpaFaq: FaqItem[] = [
  {
    q: 'GPA আর CGPA-র পার্থক্য কী?',
    a: 'GPA হলো একটা সেমিস্টারের গড় গ্রেড পয়েন্ট। CGPA হলো শুরু থেকে এখন পর্যন্ত সব সেমিস্টারের কোর্স মিলিয়ে গড়।',
  },
  {
    q: 'F গ্রেড পাওয়া কোর্স কি CGPA-তে ধরা হয়?',
    a: 'সাধারণত F পাওয়া কোর্সের ক্রেডিট হিসাবে ধরা হয় এবং পয়েন্ট শূন্য হয়, তাই CGPA কমে যায়। রিটেক করলে অনেক বিশ্ববিদ্যালয় নতুন গ্রেড ধরে। আপনার বিশ্ববিদ্যালয়ের নিয়ম দেখে নিন।',
  },
  {
    q: 'ল্যাব কোর্সের ক্রেডিট কত দেব?',
    a: 'আপনার কোর্স কারিকুলামে যে ক্রেডিট লেখা আছে সেটাই দিন। ল্যাব কোর্স প্রায়ই ১ বা ১.৫ ক্রেডিটের হয়।',
  },
  {
    q: 'আমার দেওয়া তথ্য কি কোথাও সেভ হয়?',
    a: 'না। পুরো হিসাব আপনার ফোন বা কম্পিউটারের ব্রাউজারেই হয়, কোনো সার্ভারে পাঠানো হয় না।',
  },
];
