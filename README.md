# হিসাব করো — hishabkoro.com

বাংলাদেশিদের প্রতিদিনের হিসাবের ফ্রি ক্যালকুলেটর সাইট। Next.js static export, কোনো সার্ভার বা ডাটাবেস লাগে না।
GitHub Pages-এ ফ্রি হোস্ট হয়; `main`-এ push করলেই সাইট আপডেট।

## এখন যা আছে

| পেজ | URL |
| --- | --- |
| হোম (সার্চ ও ক্যাটাগরিসহ সব টুল) | `/` |
| CGPA ক্যালকুলেটর + ভার্সিটি অনুযায়ী পেজ | `/cgpa/`, `/cgpa/uttara-university/` |
| বয়স ক্যালকুলেটর | `/age-calculator/` |
| আয়কর ক্যালকুলেটর (আয়বর্ষ ২০২৬-২৭) | `/income-tax/` |
| লোন EMI ক্যালকুলেটর | `/emi-calculator/` |
| বিদ্যুৎ বিল ক্যালকুলেটর (BERC, জুন ২০২৬) | `/electricity-bill/` |
| যাকাত ক্যালকুলেটর | `/zakat-calculator/` |
| নামাজ, সেহরি ও ইফতারের সময় (৬৪ জেলা) | `/prayer-times/`, `/prayer-times/<জেলা>/` |
| বিজয় ↔ ইউনিকোড কনভার্টার | `/bijoy-to-unicode/`, `/unicode-to-bijoy/` |
| বাংলা তারিখ কনভার্টার | `/bangla-date/` |
| জমির মাপ ক্যালকুলেটর | `/land-converter/` |
| About, Contact, Privacy, Terms (AdSense-এর জন্য দরকার) | `/about/` ইত্যাদি |

**সরকার যে হার বদলায়, সেগুলো এক ফাইলে:** আয়কর `src/lib/tax.ts`, বিদ্যুৎ দর `src/lib/electricity.ts`।
নতুন বাজেট বা BERC আদেশের পর শুধু ওই ফাইলের সংখ্যা আর টেস্ট বদলালেই হবে।

সাইট প্রতিদিন বাংলাদেশ সময় রাত ১২:০৫-এ নিজে থেকে নতুন করে বিল্ড হয় (আজকের তারিখ আর নামাজের মাসিক টেবিল হালনাগাদ রাখতে)।

সঙ্গে আছে: sitemap.xml, robots.txt, প্রতিটা পেজে আলাদা title/description/canonical, FAQ schema, AdSense-এর জায়গা।

## চালানো

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # হিসাবের unit test
npm run build      # static সাইট তৈরি হবে /out ফোল্ডারে
```

Node 20 বা তার বেশি লাগবে।

## সেটিংস (.env)

ডিফল্ট মান `src/config/site.ts`-এ বসানো আছে, তাই কিছু না দিলেও চলে। বদলাতে চাইলে লোকালি `.env.local`-এ,
আর GitHub-এ repo → Settings → Secrets and variables → Actions → **Variables** ট্যাবে দাও:

| নাম | কী | ডিফল্ট |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | সাইটের ঠিকানা (sitemap আর canonical এখান থেকে) | GitHub-এ: Pages যে ঠিকানা দেয়; লোকালি: `https://hishabkoro.com` |
| `NEXT_PUBLIC_CONTACT_EMAIL` | যোগাযোগ পেজের ইমেইল | `contact@hishabkoro.com` |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense অনুমোদনের পর `ca-pub-...` | খালি |
| `NEXT_PUBLIC_ADSENSE_SLOT` | AdSense-এ বানানো ad unit-এর slot id | খালি |

AdSense-এর দুটো মান খালি থাকলে সাইটে কোনো বিজ্ঞাপন বা স্ক্রিপ্ট থাকে না।
`contact@hishabkoro.com` কাজ করাতে রেজিস্ট্রারের ফ্রি ইমেইল ফরওয়ার্ডিং দিয়ে নিজের Gmail-এ পাঠিয়ে দাও, অথবা অন্য ইমেইল দাও।

## GitHub Pages-এ ডিপ্লয়

**১. Repo বানিয়ে push করো** (GitHub-এ `hishabkoro` নামে খালি repo বানাও, README ছাড়া):

```bash
cd hishabkoro
git init -b main
git add .
git commit -m "First version of hishabkoro.com"
git remote add origin https://github.com/<তোমার-ইউজারনেম>/hishabkoro.git
git push -u origin main
```

ফ্রি অ্যাকাউন্টে GitHub Pages শুধু **public** repo-তে চলে।

**২. Pages চালু করো:** repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**।
তারপর Actions ট্যাবে গিয়ে "Deploy to GitHub Pages" আবার চালাও (Run workflow), কারণ প্রথম push-এর সময় Pages চালু ছিল না।
সবুজ টিক এলে সাইট লাইভ: `https://<তোমার-ইউজারনেম>.github.io/hishabkoro/`

এই ঠিকানা সাব-ফোল্ডারে থাকে, তাই সব লিংক `/hishabkoro/` দিয়ে শুরু হতে হয়। workflow এটা GitHub থেকে জেনে নিজে বসায়,
কিছু করতে হয় না।

**৩. পরে ডোমেইন কিনলে:** ডোমেইনের DNS সেটিংসে:

| Type | Name | Value |
| --- | --- | --- |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<তোমার-ইউজারনেম>.github.io` |

তারপর repo → Settings → Pages → Custom domain-এ `hishabkoro.com` দিয়ে Save করো।
DNS ছড়াতে কয়েক মিনিট থেকে কয়েক ঘণ্টা লাগে। চেক পাস হলে **Enforce HTTPS** টিক দাও।
শেষে Actions থেকে workflow আরেকবার চালাও। এবার লিংক থেকে `/hishabkoro/` নিজে থেকে সরে যাবে, কোড বদলাতে হবে না।
পুরনো github.io ঠিকানায় কেউ এলে GitHub নিজেই নতুন ডোমেইনে পাঠিয়ে দেয়।

**৪. Google-কে জানাও:** Google Search Console-এ সাইটের ঠিকানা যোগ করে `<ঠিকানা>/sitemap.xml` সাবমিট করো।

AdSense-এ আবেদনের জন্য নিজের ডোমেইন লাগবে; github.io ঠিকানায় AdSense অনুমোদন পাওয়া যায় না।

## নতুন ভার্সিটি যোগ করা

`src/data/universities.ts`-এ একটা অবজেক্ট যোগ করো। `/cgpa/<slug>/` পেজ, sitemap আর তালিকা নিজে থেকে তৈরি হবে।
যোগের আগে ভার্সিটির অফিসিয়াল গ্রেডিং নীতি মিলিয়ে নাও। স্কেল আলাদা হলে নিজস্ব `scale` তালিকা দাও।

## নতুন টুল যোগ করা

1. হিসাবের ফাংশন `src/lib/`-এ লেখো, আর `src/lib/calc.test.ts`-এ টেস্ট দাও।
2. ক্যালকুলেটর UI `src/components/calculators/`-এ (`'use client'`)।
3. পেজ `src/app/<url>/page.tsx`-এ, `ToolPage` দিয়ে মুড়ে, metadata আর FAQ সহ।
4. `src/data/tools.ts`-এ এক লাইন যোগ করো — হোম পেজ, sitemap আর "আরও হিসাব" আপডেট হয়ে যাবে।

## ফোল্ডার

```
src/
  app/           পেজগুলো (প্রতিটা ফোল্ডার = একটা URL)
  components/    ToolPage, Faq, AdSlot, Total, আর calculators/
  lib/           হিসাবের ফাংশন + টেস্ট
  data/          টুলের তালিকা, ভার্সিটির তালিকা
  config/site.ts সাইটের নাম, ডোমেইন, AdSense সেটিং
```

## নকশা

হিসাবের খাতার মতো: নীল রুলটানা পাতা, বাঁয়ে লাল মার্জিন। ফলাফল খাতার "মোট" লাইনের মতো, দুই দাগের ওপর হাইলাইট করা।
রং আর ফন্ট `src/app/globals.css`-এর শুরুতে। ফন্ট (Hind Siliguri, Tiro Bangla) সাইটের সঙ্গেই থাকে, আলাদা রিকোয়েস্ট লাগে না।
