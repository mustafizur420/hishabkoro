// সাইটের মূল সেটিংস। .env বা GitHub repo-র Variables থেকে বদলানো যায়।
// `||` ব্যবহার করা হয়েছে যাতে খালি মান ("") এলেও ডিফল্টটা বসে।
export const site = {
  name: 'হিসাব করো',
  tagline: 'প্রতিদিনের হিসাব, এক জায়গায়',
  url: (process.env.NEXT_PUBLIC_SITE_URL || 'https://hishabkoro.com').replace(/\/$/, ''),
  // AdSense অনুমোদন পেলে এখানে ca-pub-XXXX বসবে (NEXT_PUBLIC_ADSENSE_CLIENT)
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'contact@hishabkoro.com',
};
