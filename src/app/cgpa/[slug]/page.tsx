import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ToolPage } from '@/components/ToolPage';
import { CgpaCalculator } from '@/components/calculators/CgpaCalculator';
import { universities } from '@/data/universities';
import { cgpaFaq, GradeTable } from '../shared';

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return universities.map((u) => ({ slug: u.slug }));
}

const find = (slug: string) => universities.find((u) => u.slug === slug);

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const u = find((await params).slug);
  if (!u) return {};
  return {
    title: `${u.nameEn} CGPA Calculator — ${u.name} সিজিপিএ হিসাব`,
    description: `${u.nameEn} CGPA calculator: ${u.name}-এর গ্রেডিং স্কেলে সেমিস্টার GPA ও মোট CGPA হিসাব করুন। কোর্সের ক্রেডিট আর গ্রেড দিলেই ফলাফল।`,
    alternates: { canonical: `/cgpa/${u.slug}/` },
  };
}

export default async function UniversityCgpaPage({ params }: { params: Promise<Params> }) {
  const u = find((await params).slug);
  if (!u) notFound();
  return (
    <ToolPage
      title={`${u.nameEn} CGPA Calculator`}
      lead={`${u.name}-এর গ্রেডিং স্কেলে আপনার সেমিস্টার GPA আর মোট CGPA বের করুন।`}
      path={`/cgpa/${u.slug}/`}
      calculator={<CgpaCalculator scale={u.scale} />}
      faq={cgpaFaq}
    >
      <h2>{u.name}-এর গ্রেডিং স্কেল</h2>
      <GradeTable scale={u.scale} />
      <p className="small">{u.sourceNote}</p>
      <h2>হিসাবের নিয়ম</h2>
      <p>
        প্রতিটা কোর্সের গ্রেড পয়েন্ট × ক্রেডিট যোগ করে মোট ক্রেডিট দিয়ে ভাগ করলে GPA হয়। আগের CGPA আর মোট ক্রেডিট দিলে এই
        সেমিস্টারসহ নতুন CGPA দেখাবে। অন্য বিশ্ববিদ্যালয়ের জন্য <Link href="/cgpa/">সাধারণ CGPA Calculator</Link> দেখুন।
      </p>
    </ToolPage>
  );
}
