import { ToolDirectory } from '@/components/ToolDirectory';

// বিল্ডের দিনের তারিখ (সাইট প্রতিদিন নতুন করে বিল্ড হয়); ব্রাউজারে আবার আজকের তারিখ বসে
const buildIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Dhaka' }).format(new Date());

export default function Home() {
  return (
    <ToolDirectory
      title="প্রতিদিনের হিসাব,"
      highlight="এক ক্লিকে"
      lead="CGPA, লোনের কিস্তি, বয়স, জমির মাপ, নামাজের সময় আর বিজয়-ইউনিকোড। বাংলায়, ফোনে, সঙ্গে সঙ্গে উত্তর।"
      initialIso={buildIso}
    />
  );
}
