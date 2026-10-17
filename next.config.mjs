/** @type {import('next').NextConfig} */
const nextConfig = {
  // পুরো সাইট static HTML হিসেবে /out ফোল্ডারে তৈরি হবে
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // <ইউজারনেম>.github.io/hishabkoro ঠিকানায় চালাতে "/hishabkoro"। নিজের ডোমেইনে খালি থাকে।
  // GitHub Actions এটা নিজে থেকে বসায় (deploy.yml দেখো), হাতে দিতে হয় না।
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
};

export default nextConfig;
