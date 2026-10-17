export type Tool = { href: string; title: string; desc: string; group: 'শিক্ষা ও চাকরি' | 'টাকা-পয়সা' | 'জমি ও তারিখ' };

// নতুন টুল যোগ করলে এখানে একটা লাইন দাও — হোম পেজ, sitemap আর "সম্পর্কিত টুল" নিজে থেকে আপডেট হবে
export const tools: Tool[] = [
  // title-এ সেই ভাষার শব্দ রাখো যেভাবে মানুষ সার্চ করে (CGPA, EMI ইংরেজিতে; জমির মাপ বাংলায়)
  { href: '/cgpa/', title: 'CGPA Calculator', desc: 'সেমিস্টারের GPA আর মোট CGPA', group: 'শিক্ষা ও চাকরি' },
  { href: '/age-calculator/', title: 'বয়স ক্যালকুলেটর (Age Calculator)', desc: 'চাকরির আবেদনের তারিখে বয়স কত', group: 'শিক্ষা ও চাকরি' },
  { href: '/emi-calculator/', title: 'EMI Calculator', desc: 'লোনের মাসিক কিস্তি আর মোট সুদ', group: 'টাকা-পয়সা' },
  { href: '/land-converter/', title: 'জমির মাপ ক্যালকুলেটর', desc: 'শতাংশ, কাঠা, বিঘা, একর, বর্গফুট', group: 'জমি ও তারিখ' },
];

export const groups = ['শিক্ষা ও চাকরি', 'টাকা-পয়সা', 'জমি ও তারিখ'] as const;
