import type { Metadata } from 'next';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'আমাদের সম্পর্কে', alternates: { canonical: '/about/' } };

export default function About() {
  return (
    <div className="plain wrap narrow prose">
      <h1>আমাদের সম্পর্কে</h1>
      <p className="lead">“{site.name}” বাংলাদেশের মানুষের প্রতিদিনের হিসাবের জন্য ফ্রি টুলের একটা সংগ্রহ।</p>
      <p>
        CGPA, চাকরির আবেদনের বয়স, লোনের কিস্তি বা জমির মাপ — এসব হিসাব অনেকেরই নিয়মিত লাগে। আমরা চাই এগুলো বাংলায়,
        সহজে আর ফোনে দ্রুত করা যাক।
      </p>
      <p>
        সব হিসাব আপনার ব্রাউজারেই হয়, কোনো অ্যাকাউন্ট লাগে না। সাইটটা বিজ্ঞাপনের আয়ে চলে, তাই আপনার জন্য সবসময় ফ্রি।
      </p>
      <p>কোনো হিসাবে ভুল পেলে বা নতুন টুলের আইডিয়া থাকলে যোগাযোগ পেজ থেকে জানান।</p>
    </div>
  );
}
