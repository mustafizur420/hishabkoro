import type { Metadata } from 'next';
import { site } from '@/config/site';

export const metadata: Metadata = { title: 'গোপনীয়তা নীতি', alternates: { canonical: '/privacy/' } };

export default function Privacy() {
  return (
    <div className="prose">
      <h1>গোপনীয়তা নীতি</h1>
      <p className="lead">সর্বশেষ হালনাগাদ: ১৭ অক্টোবর ২০২৬</p>

      <h2>আপনার দেওয়া হিসাবের তথ্য</h2>
      <p>
        ক্যালকুলেটরে আপনি যে সংখ্যা বা তারিখ লেখেন, তা শুধু আপনার ব্রাউজারে হিসাব হয়। “{site.name}” এগুলো কোনো সার্ভারে পাঠায় না
        বা সংরক্ষণ করে না।
      </p>

      <h2>বিজ্ঞাপন ও কুকি</h2>
      <p>
        এই সাইটে Google AdSense-এর মাধ্যমে বিজ্ঞাপন দেখানো হতে পারে। Google-সহ তৃতীয় পক্ষের বিজ্ঞাপনদাতারা কুকি ব্যবহার করে
        আপনার এই সাইট ও অন্যান্য সাইটে আগের ভিজিটের ভিত্তিতে বিজ্ঞাপন দেখাতে পারে। Google-এর বিজ্ঞাপন কুকি ব্যবহারের ফলে
        Google ও তার অংশীদাররা এসব বিজ্ঞাপন দেখাতে পারে।
      </p>
      <p>
        ব্যক্তিগতকৃত বিজ্ঞাপন বন্ধ করতে <a href="https://adssettings.google.com">Google বিজ্ঞাপন সেটিংস</a> দেখুন। Google কীভাবে
        তথ্য ব্যবহার করে তা জানতে <a href="https://policies.google.com/technologies/partner-sites">এই পেজ</a> দেখুন।
      </p>

      <h2>পরিসংখ্যান</h2>
      <p>
        কোন পেজ কতবার দেখা হচ্ছে বোঝার জন্য আমরা পরিচয়হীন পরিসংখ্যান (যেমন পেজ ভিউ, দেশ, ডিভাইসের ধরন) ব্যবহার করতে পারি।
        এতে আপনাকে ব্যক্তিগতভাবে শনাক্ত করা হয় না।
      </p>

      <h2>যোগাযোগ</h2>
      <p>
        এই নীতি নিয়ে প্রশ্ন থাকলে লিখুন: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a>
      </p>
    </div>
  );
}
