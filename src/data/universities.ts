import { standardScale, type GradeRow } from '@/lib/cgpa';

export type University = {
  slug: string;
  name: string;
  nameEn: string;
  scale: GradeRow[];
  /** পাতার নিচে দেখানো হয় — গ্রেড স্কেল কোথা থেকে মিলিয়েছ */
  sourceNote: string;
};

// প্রতিটা ভার্সিটির জন্য একটা করে /cgpa/<slug>/ পেজ তৈরি হবে।
// নতুন ভার্সিটি যোগের আগে তাদের অফিসিয়াল ওয়েবসাইট বা হ্যান্ডবুক থেকে গ্রেড স্কেল মিলিয়ে নাও।
// স্কেল আলাদা হলে standardScale-এর বদলে নিজস্ব তালিকা দাও।
export const universities: University[] = [
  {
    slug: 'uttara-university',
    name: 'উত্তরা ইউনিভার্সিটি',
    nameEn: 'Uttara University',
    scale: standardScale,
    sourceNote: 'প্রচলিত ৪.০০ স্কেল ধরা হয়েছে। ভার্সিটির অফিসিয়াল গ্রেডিং নীতির সঙ্গে মিলিয়ে নিন।',
  },
];
