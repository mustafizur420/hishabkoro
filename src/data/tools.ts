export const groups = ['শিক্ষা ও চাকরি', 'টাকা-পয়সা', 'নামাজ ও রোজা', 'বাংলা লেখা', 'জমি ও তারিখ'] as const;

export type Tone = 'green' | 'yellow' | 'orange' | 'peach' | 'cream';

export type Tool = {
  href: string;
  title: string;
  desc: string;
  group: (typeof groups)[number];
  /** কার্ডের গোল চিহ্নে দেখানো ছোট লেখা */
  icon: string;
  tone: Tone;
  /** সার্চে মেলানোর জন্য অতিরিক্ত শব্দ (বাংলা, ইংরেজি, Banglish) */
  keywords: string;
};

// নতুন টুল যোগ করলে এখানে একটা লাইন দাও — হোম পেজ, ফুটার, sitemap আর "আরও হিসাব" নিজে থেকে আপডেট হবে
export const tools: Tool[] = [
  // title-এ সেই ভাষার শব্দ রাখো যেভাবে মানুষ সার্চ করে (CGPA, EMI ইংরেজিতে; জমির মাপ বাংলায়)
  {
    href: '/cgpa/',
    title: 'CGPA Calculator',
    desc: 'সেমিস্টারের GPA আর মোট CGPA',
    group: 'শিক্ষা ও চাকরি',
    icon: 'A+',
    tone: 'green',
    keywords: 'cgpa gpa result রেজাল্ট সিজিপিএ জিপিএ গ্রেড grade university ভার্সিটি',
  },
  {
    href: '/age-calculator/',
    title: 'বয়স ক্যালকুলেটর (Age Calculator)',
    desc: 'চাকরির আবেদনের তারিখে বয়স কত',
    group: 'শিক্ষা ও চাকরি',
    icon: '২৫',
    tone: 'yellow',
    keywords: 'age boyos বয়স জন্মতারিখ birthday চাকরি job circular',
  },
  {
    href: '/emi-calculator/',
    title: 'EMI Calculator',
    desc: 'লোনের মাসিক কিস্তি আর মোট সুদ',
    group: 'টাকা-পয়সা',
    icon: '৳',
    tone: 'orange',
    keywords: 'emi loan লোন কিস্তি kisti সুদ interest bank ব্যাংক',
  },
  {
    href: '/income-tax/',
    title: 'Income Tax Calculator',
    desc: 'আয়বর্ষ ২০২৬-২৭-এর আয়কর',
    group: 'টাকা-পয়সা',
    icon: '%',
    tone: 'yellow',
    keywords: 'income tax ayokor আয়কর কর tax nbr রিটার্ন return স্ল্যাব slab বেতন salary',
  },
  {
    href: '/electricity-bill/',
    title: 'বিদ্যুৎ বিল ক্যালকুলেটর',
    desc: 'ইউনিট দিলেই মাসের বিল',
    group: 'টাকা-পয়সা',
    icon: 'kW',
    tone: 'peach',
    keywords: 'electricity bill biddut bil বিদ্যুৎ বিল ইউনিট unit desco dpdc palli bidyut পল্লী বিদ্যুৎ berc',
  },
  {
    href: '/zakat-calculator/',
    title: 'যাকাত ক্যালকুলেটর',
    desc: 'সম্পদ অনুযায়ী যাকাতের পরিমাণ',
    group: 'নামাজ ও রোজা',
    icon: '২.৫',
    tone: 'green',
    keywords: 'zakat jakat যাকাত নিসাব nisab সোনা gold রুপা silver রমজান ramadan',
  },
  {
    href: '/prayer-times/',
    title: 'নামাজের সময়সূচি',
    desc: '৬৪ জেলার নামাজ, সেহরি ও ইফতার',
    group: 'নামাজ ও রোজা',
    icon: 'ফজ',
    tone: 'orange',
    keywords: 'namaz prayer time salat নামাজ সময় সেহরি sehri iftar ইফতার রোজা ramadan ফজর মাগরিব আজান azan',
  },
  {
    href: '/bangla-date/',
    title: 'আজকের বাংলা তারিখ',
    desc: 'ইংরেজি ↔ বাংলা তারিখ, বঙ্গাব্দ',
    group: 'জমি ও তারিখ',
    icon: '১৪',
    tone: 'yellow',
    keywords: 'bangla date বাংলা তারিখ বঙ্গাব্দ bangabda calendar ক্যালেন্ডার পঞ্জিকা আজ কত তারিখ',
  },
  {
    href: '/bijoy-to-unicode/',
    title: 'Bijoy to Unicode',
    desc: 'বিজয়ের লেখা ইউনিকোডে',
    group: 'বাংলা লেখা',
    icon: 'অ',
    tone: 'peach',
    keywords: 'bijoy unicode বিজয় ইউনিকোড sutonnymj sutonny converter কনভার্টার font ফন্ট',
  },
  {
    href: '/unicode-to-bijoy/',
    title: 'Unicode to Bijoy',
    desc: 'ইউনিকোড লেখা বিজয়ে (SutonnyMJ)',
    group: 'বাংলা লেখা',
    icon: 'Av',
    tone: 'cream',
    keywords: 'bijoy unicode বিজয় ইউনিকোড sutonnymj sutonny converter কনভার্টার font ফন্ট',
  },
  {
    href: '/land-converter/',
    title: 'জমির মাপ ক্যালকুলেটর',
    desc: 'শতাংশ, কাঠা, বিঘা, একর, বর্গফুট',
    group: 'জমি ও তারিখ',
    icon: 'কা',
    tone: 'green',
    keywords: 'jomi jomir map জমি কাঠা katha বিঘা bigha শতাংশ decimal একর acre বর্গফুট',
  },
];
